import {


  createMemo,
  createSignal,
} from 'solid-js';



import { StyledBox } from './StyledBox';
import { BoxPropTypes } from './propTypes';

const Box = (

  {
    a11yTitle,
    background,
    border,
    children,
    direction = 'column',
    elevation, // munged to avoid styled-components putting it in the DOM
    fill, // munged to avoid styled-components putting it in the DOM
    gap,
    kind, // munged to avoid styled-components putting it in the DOM
    onBlur,
    onClick,
    onFocus,
    overflow, // munged to avoid styled-components putting it in the DOM
    responsive = true,
    tag,
    as,
    wrap, // munged to avoid styled-components putting it in the DOM,
    width, // munged to avoid styled-components putting it in the DOM
    height, // munged to avoid styled-components putting it in the DOM
    tabIndex,
    ...rest
  },
  ref,
) => {

  const focusable = createMemo(
    () => onClick && !(tabIndex < 0),
    [onClick, tabIndex],
  );

  const [focus, setFocus] = createSignal();

  const clickProps = createMemo(() => {
    if (focusable) {
      return {
        onClick,
        onFocus: (event) => {
          setFocus(true);
          if (onFocus) onFocus(event);
        },
        onBlur: (event) => {
          setFocus(false);
          if (onBlur) onBlur(event);
        },
      };
    }
    const result = { onBlur: '', onClick: '', onFocus: '' };
    if (onBlur) result.onBlur = onBlur;
    if (onClick) result.onClick = onClick;
    if (onFocus) result.onFocus = onFocus;
    return result;
  }, [focusable, onClick, onFocus, onBlur]);

  const adjustedTabIndex = createMemo(() => {
    if (tabIndex !== undefined) return tabIndex;
    if (focusable) return 0;
    return undefined;
  }, [focusable, tabIndex]);

  if (
    (border === 'between' || (border && border.side === 'between')) &&
    !gap
  ) {
    console.warn('Box must have a gap to use border between');
  }



  // construct a new theme object in case we have a background that wants
  // to change the background color context

  let content = (
    <StyledBox
      as={!as && tag ? tag : as}
      aria-label={a11yTitle}
      background={background}
      border={border}
      ref={ref}
      directionProp={direction}
      elevationProp={elevation}
      fillProp={fill}
      focus={focus}
      kindProp={kind}
      overflowProp={overflow}
      wrapProp={wrap}
      widthProp={width}
      heightProp={height}
      responsive={responsive}
      tabIndex={adjustedTabIndex}
      {...clickProps}
      {...rest}
    >

    </StyledBox>
  );



  return content;
};
Box.displayName = 'Box';
Box.propTypes = BoxPropTypes;
export { Box };
