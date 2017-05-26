"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const { Svg, Rect, Defs, LinearGradient, Stop, RadialGradient, Path } = require('react-native-svg');
const alpha = require('color-alpha');
class BoxShadow extends React.Component {
    linear(key, opacity, color) {
        return [
            React.createElement(Stop, { offset: "0", stopColor: color, stopOpacity: `${opacity}`, key: key + 'Linear0' }),
            React.createElement(Stop, { offset: "1", stopColor: color, stopOpacity: "0", key: key + 'Linear1' })
        ];
    }
    radial(key, opacity, color, offset) {
        return [
            React.createElement(Stop, { offset: "0", stopColor: color, stopOpacity: opacity, key: key + 'Radial0' }),
            React.createElement(Stop, { offset: `${offset}`, stopColor: color, stopOpacity: opacity, key: key + 'Radial1' }),
            React.createElement(Stop, { offset: "1", stopColor: color, stopOpacity: "0", key: key + 'Radial2' })
        ];
    }
    render() {
        const _a = this.props, { settings, children } = _a, others = __rest(_a, ["settings", "children"]);
        const { width = 0, height = 0, color = "#000", border = 0, radius = 0, opacity = 1, x = 0, y = 0, } = settings;
        const lineWidth = border, rectWidth = width - radius * 2, rectHeight = height - radius * 2;
        const outerWidth = lineWidth + radius;
        const middleOffset = radius / outerWidth;
        return (React.createElement(react_native_1.View, Object.assign({}, others),
            React.createElement(Svg, { height: height + lineWidth * 2 + radius * 2, width: width + lineWidth * 2 + radius * 2, style: { position: "absolute", top: y - lineWidth, left: x - lineWidth } },
                React.createElement(Defs, null,
                    React.createElement(LinearGradient, { id: "top", x1: "0", y1: `${lineWidth}`, x2: "0", y2: "0" }, this.linear('BoxTop', opacity, color)),
                    React.createElement(LinearGradient, { id: "bottom", x1: "0", y1: "0", x2: "0", y2: `${lineWidth}` }, this.linear('BoxBottom', opacity, color)),
                    React.createElement(LinearGradient, { id: "left", x1: `${lineWidth}`, y1: "0", x2: "0", y2: "0" }, this.linear('BoxLeft', opacity, color)),
                    React.createElement(LinearGradient, { id: "right", x1: "0", y1: "0", x2: `${lineWidth}`, y2: "0" }, this.linear('BoxRight', opacity, color)),
                    React.createElement(RadialGradient, { id: "border-left-top", r: outerWidth, cx: outerWidth, cy: outerWidth, fx: outerWidth, fy: outerWidth }, this.radial('BoxLeftTop', opacity, color, middleOffset)),
                    React.createElement(RadialGradient, { id: "border-left-bottom", r: outerWidth, cx: outerWidth, cy: 0, fx: outerWidth, fy: 0 }, this.radial('BoxLeftBottom', opacity, color, middleOffset)),
                    React.createElement(RadialGradient, { id: "border-right-top", r: outerWidth, cx: 0, cy: outerWidth, fx: 0, fy: outerWidth }, this.radial('BoxRightTop', opacity, color, middleOffset)),
                    React.createElement(RadialGradient, { id: "border-right-bottom", r: outerWidth, cx: 0, cy: 0, fx: 0, fy: 0 }, this.radial('BoxRightBottom', opacity, color, middleOffset))),
                React.createElement(Path, { d: `M 0 ${outerWidth},Q 0 0 ${outerWidth} 0,v ${lineWidth},q ${-radius} 0 ${-radius} ${radius},h ${-lineWidth},z`, fill: "url(#border-left-top)" }),
                React.createElement(Path, { d: `M ${rectWidth + lineWidth + radius} 0,q ${outerWidth} 0 ${outerWidth} ${outerWidth},h ${-lineWidth},q 0 ${-radius} ${-radius} ${-radius},v ${-lineWidth},z`, fill: "url(#border-right-top)" }),
                React.createElement(Path, { d: `M ${rectWidth + lineWidth + 2 * radius} ${rectHeight + lineWidth + radius},h ${lineWidth},q 0 ${outerWidth} -${outerWidth} ${outerWidth},v ${-lineWidth},q ${radius} 0 ${radius} ${-radius},z`, fill: "url(#border-right-bottom)" }),
                React.createElement(Path, { d: `M 0 ${rectHeight + lineWidth + radius},q 0 ${outerWidth} ${outerWidth} ${outerWidth},v ${-lineWidth},q ${-radius} 0 ${-radius} ${-radius},h ${-lineWidth},z`, fill: "url(#border-left-bottom)" }),
                React.createElement(Rect, { x: outerWidth, y: "0", width: rectWidth, height: lineWidth, fill: "url(#top)" }),
                React.createElement(Rect, { x: "0", y: outerWidth, width: lineWidth, height: rectHeight, fill: "url(#left)" }),
                React.createElement(Rect, { x: rectWidth + lineWidth + 2 * radius, y: outerWidth, width: lineWidth, height: rectHeight, fill: "url(#right)" }),
                React.createElement(Rect, { x: outerWidth, y: rectHeight + lineWidth + 2 * radius, width: rectWidth, height: lineWidth, fill: "url(#bottom)" }),
                React.createElement(Path, { d: `M ${outerWidth} ${lineWidth},h ${rectWidth},q ${radius} 0 ${radius} ${radius},v ${rectHeight},q 0 ${radius} -${radius} ${radius},h -${rectWidth},q -${radius} 0 -${radius} -${radius},v -${rectHeight},q 0 -${radius} ${radius} -${radius}`, fill: alpha(color, opacity) })),
            children));
    }
}
class ShadowView extends React.Component {
    render() {
        const _a = this.props, { style, children } = _a, otherProps = __rest(_a, ["style", "children"]);
        const styleObject = react_native_1.StyleSheet.flatten(this.props.style);
        const { shadowColor, shadowOffset, shadowOpacity, shadowRadius } = styleObject, other = __rest(styleObject, ["shadowColor", "shadowOffset", "shadowOpacity", "shadowRadius"]);
        const _b = other, { width, height, margin, marginHorizontal, marginVertical, marginTop, marginRight, marginBottom, marginLeft, position, left, right, bottom, top, flex, alignSelf, flexBasis, flexGrow, flexShrink } = _b, innerStyle = __rest(_b, ["width", "height", "margin", "marginHorizontal", "marginVertical", "marginTop", "marginRight", "marginBottom", "marginLeft", "position", "left", "right", "bottom", "top", "flex", "alignSelf", "flexBasis", "flexGrow", "flexShrink"]);
        const { borderRadius } = innerStyle;
        const outerStyle = {
            width, height,
            margin,
            marginHorizontal,
            marginVertical,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            position,
            left, right, bottom, top,
            flex, alignSelf,
            flexBasis, flexGrow, flexShrink,
        };
        const shadowSettings = {
            width,
            height,
            opacity: shadowOpacity * 0.5,
            border: shadowRadius * 1.15,
            radius: borderRadius,
            color: shadowColor,
            x: shadowOffset.width,
            y: shadowOffset.height
        };
        return (React.createElement(BoxShadow, Object.assign({ settings: shadowSettings, style: outerStyle }, otherProps),
            React.createElement(react_native_1.View, { pointerEvents: "box-none", style: [{ flex: 1 }, innerStyle] }, children)));
    }
}
exports.ShadowView = ShadowView;
exports.default = ShadowView;
