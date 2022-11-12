import { marked } from "marked";
export function jsonToHTML(obj: any): string {
  function processElement(element) {
    if (!element.type || !processType[element.type]) {
      return null;
    }
    return processType[element.type](element);
  }

  const processType = {
    mrkdwn: (payload) => {
      const rawMarkup = payload.text;
      const markupProcessed = marked.parse(rawMarkup, { breaks: true });
      const emojiProcessed = markupProcessed.replaceAll(
        ":star:",
        `<span class="c-emoji c-emoji__medium c-emoji--inline" data-qa="emoji" delay="300" data-sk="tooltip_parent"><img src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/2b50@2x.png" aria-label="star emoji" alt=":star:" data-stringify-type="emoji" data-stringify-emoji=":star:" /></span>`
      );
      return `<div class="p-mrkdwn_element"><span dir="auto">${marked.parse(
        emojiProcessed,
        { breaks: true }
      )}</span></div>`;
    },

    section: (payload) => {
      let children = [];
      if (payload.text) {
        children.push(
          `<div class="p-section_block_text_content"><div class="p-section_block__text">${processElement(
            payload.text
          )}</div></div>`
        );
      }

      if (payload.accessory) {
        children.push(
          `<div class="p-section_block__accessory">${processElement(
            payload.accessory
          )}</div>`
        );
      }

      children = children.map(
        (item) =>
          `<div data-qa="bk_section_block" class="p-section_block p-section_block--no_top_margin">${item}</div>`
      );

      return ` <div class="p-bkb_preview__rendered-block"><div class="p-block_kit_renderer__block_wrapper">${children.join(
        ""
      )}</div></div>`;
    },

    image: (payload) =>
      `<div data-qa="bk_section_block_image_element" class="p-section_block__image" role="img" aria-label="${payload.alt_text}" title="${payload.alt_text}" alt="${payload.alt_text}" style=" background-image: url('${payload.image_url}');" ></div>`,

    divider: () =>
      `<div data-qa="bk_divider_block" class="p-divider_block"></div>`,

    actions: (payload) => {
      const elements = payload.elements;
      const elementsHTML = elements.map((item) => processElement(item));
      const elementHTMLwrapped = elementsHTML.map(
        (item) =>
          `<div class="p-actions_block_elements"><div class="p-actions_block__action" data-qa="bk_actions_block_action">${item}</div></div>`
      );

      return `<div class="p-block_kit_renderer__block_wrapper"><div data-qa="bk_actions_block" class="p-actions_block">${elementHTMLwrapped.join(
        ""
      )}</div></div>`;
    },

    button: (payload) => {
      const innerHTML = payload.text && processElement(payload.text);
      return `<button class="c-button c-button--outline c-button--small p-block_kit_button_element" id="+bR-WFFZ" data-qa-block-id="WFFZ" data-qa-action-id="+bR" type="button"> ${innerHTML}</button>`;
    },

    plain_text: (payload) =>
      `<div class="p-plain_text_element" data-qa="bk-plain_text_element"><span dir="auto">${payload.text}</span></div>`,
  };

  const blocks = obj.blocks;
  const renderedBlocksHTML = blocks.map((item) => processElement(item));
  const renderedBlocksHTMLWrapped = renderedBlocksHTML.map(
    (item) =>
      `<div class="p-bkb_preview__rendered-block"><div class="p-block_kit_renderer__block_wrapper">${item}</div></div>`
  );

  const contentHTML = renderedBlocksHTMLWrapped.join("");

  return `<div class="p-bkb_preview_container"><div class="p-bkb_preview_container__icons"></div><div class="p-bkb_preview__attachment p-bkb_preview__attachment--desktop"><div data-rbd-droppable-id="column-1" data-rbd-droppable-context-id="0"><div class="p-bkb_preview__message"><div class="p-bkb_preview__content"><div class="p-block_kit_renderer" data-qa="block-kit-renderer">${contentHTML}</div></div></div></div></div>`;
}
