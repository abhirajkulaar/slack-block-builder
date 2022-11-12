import { SurfaceBuilderBase } from '../internal/base';
import { SurfaceType } from '../internal/constants';
import { SlackHomeTabDto } from '../internal/dto';
import { applyMixins, getBuilderResults } from '../internal/helpers';
import {
  Blocks,
  CallbackId,
  ExternalId,
  PrivateMetaData,
  BuildToJSON,
  BuildToHTML,
  BuildToObject,
  GetBlocks,
  GetPreviewUrl,
  PrintPreviewUrl,
} from '../internal/methods';

import type { SlackBlockDto } from '../internal/dto';
import type { ViewBlockBuilder } from '../internal/types';

export interface HomeTabParams {
  privateMetaData?: string;
  callbackId?: string;
  externalId?: string;
}

export interface HomeTabBuilder extends Blocks<ViewBlockBuilder>,
  CallbackId,
  ExternalId,
  PrivateMetaData,
  BuildToJSON,
  BuildToHTML,
  BuildToObject<SlackHomeTabDto>,
  GetBlocks,
  GetPreviewUrl,
  PrintPreviewUrl {
}

/**
 * @@link https://api.slack.com/reference/surfaces/views
 * @@displayName Home Tab
 */

export class HomeTabBuilder extends SurfaceBuilderBase {
  /** @internal */

  public build(): Readonly<SlackHomeTabDto> {
    return this.getResult(SlackHomeTabDto, {
      type: SurfaceType.HomeTab,
      blocks: getBuilderResults<SlackBlockDto>(this.props.blocks),
    });
  }
}

applyMixins(HomeTabBuilder, [
  Blocks,
  CallbackId,
  ExternalId,
  PrivateMetaData,
  BuildToJSON,
  BuildToHTML,
  BuildToObject,
  GetBlocks,
  GetPreviewUrl,
  PrintPreviewUrl,
]);
