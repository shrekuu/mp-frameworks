import * as React from 'react';
import { View as AlipayView } from 'remax/alipay';
import { View as WechatView } from 'remax/wechat';
import { Platform } from 'remax';

export default function Image(props) {
  switch (Platform.current) {
    case 'alipay':
      return <AlipayView {...props} />;
    case 'wechat':
    default:
      return <WechatView {...props} />;
  }
}
