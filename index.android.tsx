import * as React from 'react'
import { View, ViewStyle, StyleSheet, ViewProperties } from 'react-native'
const { Svg, Rect, Defs, LinearGradient, Stop, RadialGradient, Path } = require('react-native-svg')
const alpha = require('color-alpha')

interface BoxShadowProperties extends ViewProperties {
    settings: {
        width?: number
        height?: number
        color?: string
        border?: number
        radius?: number
        opacity?: number
        x?: number
        y?: number
    }
}

class BoxShadow extends React.Component<BoxShadowProperties, any> {
    linear(key: string, opacity: number, color: string) {
        return [
            <Stop offset="0" stopColor={color} stopOpacity={`${opacity}`} key={key + 'Linear0'} />,
            <Stop offset="1" stopColor={color} stopOpacity="0" key={key + 'Linear1'} />
        ]
    }
    radial(key: string, opacity: number, color: string, offset: number) {
        return [
            <Stop offset="0" stopColor={color} stopOpacity={opacity} key={key + 'Radial0'} />,
            <Stop offset={`${offset}`} stopColor={color} stopOpacity={opacity} key={key + 'Radial1'} />,
            <Stop offset="1" stopColor={color} stopOpacity="0" key={key + 'Radial2'} />
        ]
    }
    render() {
        const {
            settings,
            children,
            ...others
        } = this.props
        const {
            width = 0,
            height = 0,
            color = "#000",
            border = 0,
            radius = 0,
            opacity = 1,
            x = 0,
            y = 0,
        } = settings

        const lineWidth = border,
            rectWidth = width - radius * 2,
            rectHeight = height - radius * 2

        const outerWidth = lineWidth + radius
        const middleOffset = radius / outerWidth
        return (
            <View {...others}>
                <Svg height={height + lineWidth * 2 + radius * 2} width={width + lineWidth * 2 + radius * 2} style={{ position: "absolute", top: y - lineWidth, left: x - lineWidth }}>
                    <Defs>
                        <LinearGradient id="top"
                            x1="0"
                            y1={`${lineWidth}`}
                            x2="0"
                            y2="0"
                        >{this.linear('BoxTop', opacity, color)}</LinearGradient>
                        <LinearGradient id="bottom"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2={`${lineWidth}`}
                        >{this.linear('BoxBottom', opacity, color)}</LinearGradient>
                        <LinearGradient id="left"
                            x1={`${lineWidth}`}
                            y1="0"
                            x2="0"
                            y2="0"
                        >{this.linear('BoxLeft', opacity, color)}</LinearGradient>
                        <LinearGradient id="right"
                            x1="0"
                            y1="0"
                            x2={`${lineWidth}`}
                            y2="0"
                        >{this.linear('BoxRight', opacity, color)}</LinearGradient>

                        <RadialGradient id="border-left-top"
                            r={outerWidth}
                            cx={outerWidth}
                            cy={outerWidth}
                            fx={outerWidth}
                            fy={outerWidth}
                        >{this.radial('BoxLeftTop', opacity, color, middleOffset)}</RadialGradient>
                        <RadialGradient id="border-left-bottom"
                            r={outerWidth}
                            cx={outerWidth}
                            cy={0}
                            fx={outerWidth}
                            fy={0}
                        >{this.radial('BoxLeftBottom', opacity, color, middleOffset)}</RadialGradient>
                        <RadialGradient id="border-right-top"
                            r={outerWidth}
                            cx={0}
                            cy={outerWidth}
                            fx={0}
                            fy={outerWidth}
                        >{this.radial('BoxRightTop', opacity, color, middleOffset)}</RadialGradient>
                        <RadialGradient id="border-right-bottom"
                            r={outerWidth}
                            cx={0}
                            cy={0}
                            fx={0}
                            fy={0}
                        >{this.radial('BoxRightBottom', opacity, color, middleOffset)}</RadialGradient>
                    </Defs>

                    <Path d={`M 0 ${outerWidth},Q 0 0 ${outerWidth} 0,v ${lineWidth},q ${-radius} 0 ${-radius} ${radius},h ${-lineWidth},z`} fill="url(#border-left-top)" />
                    <Path d={`M ${rectWidth + lineWidth + radius} 0,q ${outerWidth} 0 ${outerWidth} ${outerWidth},h ${-lineWidth},q 0 ${-radius} ${-radius} ${-radius},v ${-lineWidth},z`} fill="url(#border-right-top)" />
                    <Path d={`M ${rectWidth + lineWidth + 2 * radius} ${rectHeight + lineWidth + radius},h ${lineWidth},q 0 ${outerWidth} -${outerWidth} ${outerWidth},v ${-lineWidth},q ${radius} 0 ${radius} ${-radius},z`} fill="url(#border-right-bottom)" />
                    <Path d={`M 0 ${rectHeight + lineWidth + radius},q 0 ${outerWidth} ${outerWidth} ${outerWidth},v ${-lineWidth},q ${-radius} 0 ${-radius} ${-radius},h ${-lineWidth},z`} fill="url(#border-left-bottom)" />

                    <Rect x={outerWidth} y="0" width={rectWidth} height={lineWidth} fill="url(#top)" />
                    <Rect x="0" y={outerWidth} width={lineWidth} height={rectHeight} fill="url(#left)" />
                    <Rect x={rectWidth + lineWidth + 2 * radius} y={outerWidth} width={lineWidth} height={rectHeight} fill="url(#right)" />
                    <Rect x={outerWidth} y={rectHeight + lineWidth + 2 * radius} width={rectWidth} height={lineWidth} fill="url(#bottom)" />

                    <Path
                        d={`M ${outerWidth} ${lineWidth},h ${rectWidth},q ${radius} 0 ${radius} ${radius},v ${rectHeight},q 0 ${radius} -${radius} ${radius},h -${rectWidth},q -${radius} 0 -${radius} -${radius},v -${rectHeight},q 0 -${radius} ${radius} -${radius}`}
                        fill={alpha(color, opacity)}
                    />
                </Svg>
                {children}
            </View>
        )
    }
}

export class ShadowView extends React.Component<ViewProperties, any> {
    render() {
        const {
            style, children,
            ...otherProps
        } = this.props
        const styleObject = StyleSheet.flatten(this.props.style)
        const {
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            ...other
        } = styleObject
        const {
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

            ...innerStyle
        } = other as any
        const {
            borderRadius
        } = innerStyle
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
        }
        const shadowSettings = {
            width,
            height,
            opacity: shadowOpacity * 0.5,
            border: shadowRadius * 1.15,
            radius: borderRadius,
            color: shadowColor,
            x: shadowOffset.width,
            y: shadowOffset.height
        }
        return (
            <BoxShadow settings={shadowSettings} style={outerStyle} {...otherProps}>
                <View pointerEvents="box-none" style={[{ flex: 1 }, innerStyle]}>
                    {children}
                </View>
            </BoxShadow>
        )
    }
}

export default ShadowView