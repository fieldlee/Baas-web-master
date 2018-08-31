import React from 'react';
import {
  Modal,
  Button,
  Form
} from 'antd';
import styles from './modal.less';

export class BaseModal extends React.Component {
  render() {
    const {title, visible, onCancel, onConfirm} = this.props;
    return (
      <Modal
        wrapClassName={styles.jModal}
        title={title}
        maskStyle={{backgroundColor: 'rgba(255, 255, 255, .5)'}}
        onCancel={onCancel}
        visible={visible}
        footer={null}
      >
        {this.props.children}
        {onConfirm ?
          <Form.Item className='u-text-center' label=' ' colon={false}>
            <Button className='ant-btn-lg btn-block' type='primary'
                    onClick={onConfirm}>确定</Button>
          </Form.Item>
          :
          null
        }
      </Modal>
    );
  }
}
