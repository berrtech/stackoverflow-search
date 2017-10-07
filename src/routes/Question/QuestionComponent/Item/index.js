import React from 'react';

import moment from 'moment';
import { decodeHtml } from '../../../../helpers';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import cx from './Item.module.scss';

const Item = ({item, style}) => {
  return (
    <div
      className={cx('wrapper')}
    > 
      <div
        className={cx('score')}
      >
        {item.score}
      </div>

      <Card
        style={style}
      >
        <CardHeader
          title={decodeHtml(item.owner.display_name)}
          subtitle={moment.unix(item.creation_date).fromNow()}
          avatar={item.owner.profile_image}
        />

        {item.title && <CardTitle title={decodeHtml(item.title)} />}

        <CardText>
          <div 
            dangerouslySetInnerHTML={{__html: decodeHtml(item.body)}}
            ref={ref => {
              if (!ref) return;
              // если в ответе или вопросе будет html-код, он не отобразится,
              // поскольку преобразуется в DOM-элементы
              // придется руками выдергивать и вставлять как текст
              const codeBlocks = [...ref.getElementsByTagName('code')];
              codeBlocks.forEach(block => {
                block.innerText = block.innerHTML
              })
            }}
          />
        </CardText>
      </Card>
    </div>
  );
};

export default Item;