import { SurfaceBuilderBase } from '../internal/base';
import { SurfaceType } from '../internal/constants';
import { SlackWorkflowStepDto } from '../internal/dto';
import { applyMixins, getPlainTextObject, getBuilderResults } from '../internal/helpers';
import {
  Blocks,
  CallbackId,
  PrivateMetaData,
  SubmitDisabled,
  BuildToJSON,
  BuildToObject,
  GetBlocks,
  GetPreviewUrl,
  PrintPreviewUrl,
  BuildToHTML
} from '../internal/methods';

import type { SlackBlockDto } from '../internal/dto';
import type { ViewBlockBuilder } from '../internal/types';

export interface WorkflowStepParams {
  privateMetaData?: string;
  callbackId?: string;
}

export interface WorkflowStepBuilder extends Blocks<ViewBlockBuilder>,
  CallbackId,
  PrivateMetaData,
  SubmitDisabled,
  BuildToJSON,
  BuildToHTML,
  BuildToObject<SlackWorkflowStepDto>,
  GetBlocks,
  GetPreviewUrl,
  PrintPreviewUrl {
}

/**
 * @@link https://api.slack.com/reference/workflows/configuration-view
 * @@displayName Workflow Step
 */

export class WorkflowStepBuilder extends SurfaceBuilderBase {
  /** @internal */

  public build(): Readonly<SlackWorkflowStepDto> {
    return this.getResult(SlackWorkflowStepDto, {
      type: SurfaceType.WorkflowStep,
      title: getPlainTextObject(this.props.title),
      blocks: getBuilderResults<SlackBlockDto>(this.props.blocks),
      close: getPlainTextObject(this.props.close),
      submit: getPlainTextObject(this.props.submit),
    });
  }
}

applyMixins(WorkflowStepBuilder, [
  Blocks,
  CallbackId,
  PrivateMetaData,
  SubmitDisabled,
  BuildToJSON,
  BuildToHTML,
  BuildToObject,
  GetBlocks,
  GetPreviewUrl,
  PrintPreviewUrl,
]);
