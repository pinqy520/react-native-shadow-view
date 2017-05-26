# react-native-shadow-view

![npm version](http://img.shields.io/npm/v/react-native-shadow-view.svg)

React Native's View Component with Shadows Both on Android and iOS, inspired by react-native-shadow

## Install

[Install `react-native-svg`](https://github.com/react-native-community/react-native-svg) first


```
$ npm install react-native-shadow-view --save
```

## Usage

``` javascript
import ShadowView from 'react-native-shadow-view'

const Example = (props) => (
    <ShadowView style={{
        width: 348,
        height: 470,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4
    }}>
        <Text>{data}</Text>
    </ShadowView>
)
```

## Known Issues

- The `width` and `height` of the `View` style must be specified.