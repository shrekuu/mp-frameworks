import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './listItem.scss'


export default class ListItem extends Component {
  render () {
    const { name, value } = this.props
    return (
      <View>
        <View>name: {name}</View>
        <View>value: {value}</View>
      </View>
    )
  }
}
