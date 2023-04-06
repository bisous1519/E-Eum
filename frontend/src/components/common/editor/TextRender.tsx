import React from 'react';
import RenderHTML, { MixedStyleDeclaration } from 'react-native-render-html';
import theme from '../../../utils/theme';

type TextRenderPropsType = {
  content: string;
  style?: MixedStyleDeclaration;
};

const TextRender = React.memo(function TextRender({
  content,
  style,
}: TextRenderPropsType): JSX.Element {
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
      color: theme.mainColor.dark,
      fontSize: theme.fontSize.regular,
    },
  };

  return (
    <RenderHTML
      tagsStyles={contentTagsStyles}
      source={{ html: content }}
      contentWidth={300}
      baseStyle={{ lineHeight: 24, ...style }}
    />
  );
});

export default TextRender;

