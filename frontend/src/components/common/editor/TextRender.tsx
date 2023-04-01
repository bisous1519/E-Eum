import React from 'react';
import RenderHTML from 'react-native-render-html';
import theme from '../../../utils/theme';

const contentTagsStyles = {
  div: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  ul: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  ol: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  li: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  strike: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  u: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  i: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  b: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
};

type TextRenderPropsType = {
  content: string;
};

export default function TextRender({
  content,
}: TextRenderPropsType): JSX.Element {
  return (
    <RenderHTML
      tagsStyles={contentTagsStyles}
      source={{ html: content }}
      contentWidth={300}
    />
  );
}

