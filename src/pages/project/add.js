import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button
} from 'antd';
import {rules} from '../../utils/rules';
import {Counter} from '../../components/counter';
import {Server} from './components/serverAdder/server';
import {FormHelperPanel} from './components/formHelperPanel';
import styles from './form.less';
import {WrapMessage} from './components/wrapMessage';

class AddForm extends React.Component {
  getOrgs(orgs) {
    this.props.project.orgs.map((org, index) => {
      const projectOrgs = orgs[index];
      org.orgId = projectOrgs.orgId;
      const peers = projectOrgs.peers;
      if (peers) {
        org.peers.map((peer, pIndex) => {
          org.peers[pIndex] = peers[pIndex] || peer;
        });
      }
    });
    return this.props.project.orgs;
  }
  getOrders(orders) {
    this.props.project.orders.map((order, index) => {
      if (orders) {
        const orderIp = orders[index].orderIp;
        if (orderIp) {
          order.orderIp = orderIp;
        }
      }
    });
    return this.props.project.orders;
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'project/saveProject',
          payload: {
            id: values.id,
            projectName: values.projectName,
            domain: values.domain,
            orgs: this.getOrgs(values.orgs),
            orders: this.getOrders(values.orders)
          }
        })
      }
    });
  }

  onAddOrgs(count) {
    const {orgs} = this.props.project;
    this.props.dispatch({
      type: 'project/addOrgs',
      payload: {
        orgs,
        count
      }
    });
  }

  onMinusOrgs(count) {
    const {orgs} = this.props.project;
    this.props.dispatch({
      type: 'project/minusOrgs',
      payload: {
        orgs,
        count
      }
    });
  }

  onAddPeers(index, count) {
    const {orgs} = this.props.project;
    this.props.dispatch({
      type: 'project/addPeers',
      payload: {
        orgs,
        index,
        count
      }
    });
  }

  onMinusPeers(index, count) {
    const {orgs} = this.props.project;
    this.props.dispatch({
      type: 'project/minusPeers',
      payload: {
        orgs,
        index,
        count
      }
    });
  }

  onAddOrders(count) {
    const {orders} = this.props.project;
    this.props.dispatch({
      type: 'project/addOrders',
      payload: {
        orders,
        count
      }
    });
  }

  onMinusOrders(count) {
    const {orders} = this.props.project;
    this.props.dispatch({
      type: 'project/minusOrders',
      payload: {
        orders,
        count
      }
    });
  }

  validateSameOrgId(fieldIndex, rule, value, callback) {
    const {project, form} = this.props;
    let error;
    project.orgs.forEach((org, index) => {
      const isSameOrg = index !== fieldIndex && form.getFieldValue(`orgs[${index}].orgId`) === value;
      if (isSameOrg) {
        error = true;
      }
    });
    if (value && error) {
      callback('组织ID重复');
    } else {
      callback();
    }
  }

  render() {
    const {form, project, loading} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div className={styles.projectFormContainer}>
        <Form className={styles.form}>
          <Form.Item label='项目名称' colon={false}>
            {getFieldDecorator('projectName', {
              validateTrigger: ['onChange'],
              rules: [{
                required: true,
                whitespace: false,
                message: <WrapMessage msg='请输入项目名称.'/>,
              }]
            })(
              <Input type='text'
                     placeholder='请输入项目名称'/>
            )}
          </Form.Item>
          <Form.Item label='域名' colon={false}>
            {getFieldDecorator('domain', {
              validateTrigger: ['onChange'],
              rules: [{
                required: true,
                whitespace: false,
                type: 'string',
                message: <WrapMessage msg='输入域名格式不正确，请重新输入'/>,
                pattern: rules.domain
              }]
            })(
              <Input type='text'
                     placeholder='请输入域名（例:domain.com）'/>
            )}
          </Form.Item>
          <Form.Item className='mt-6' label='组织数量' colon={false}>
            <Counter
              minValue={2}
              maxValue={10}
              defaultValue={project.orgs.length}
              onIncrement={this.onAddOrgs.bind(this)}
              onDecrement={this.onMinusOrgs.bind(this)}
            />
          </Form.Item>
          {
            project.orgs.map((org, index) => {
              const decoratorName = `orgs[${index}]`;
              return (
                <div className={`${styles.formItemChildContainer} mb-2`}
                     key={index}>
                  <Form.Item className='mb-4' label='组织ID' colon={false}>
                    {getFieldDecorator(`${decoratorName}.orgId`, {
                      validateTrigger: ['onChange'],
                      rules: [
                        {
                          required: true,
                          whitespace: false,
                          type: 'string',
                          message: <WrapMessage msg='请输入组织ID'/>
                        },
                        {
                          validator: this.validateSameOrgId.bind(this, index),
                        }
                      ],
                    })(
                      <Input type='text' placeholder='请输入组织ID'/>
                    )}
                  </Form.Item>
                  <Form.Item className='my6 mb-4' label='节点ID' colon={false}>
                    <Counter
                      minValue={2}
                      maxValue={4}
                      defaultValue={org.peers.length}
                      onIncrement={this.onAddPeers.bind(this, index)}
                      onDecrement={this.onMinusPeers.bind(this, index)}
                    />
                  </Form.Item>
                  {
                    org.peers.map((peer, index) => {
                      return (
                        <Server key={index}
                                form={form}
                                isChecked={false}
                                isDisable={false}
                                decoratorName={`${decoratorName}.peers[${index}].peerIp`}
                                value={peer.peerIp}/>
                      )
                    })
                  }
                </div>
              )
            })
          }
          <div className='mb-4'>
            <Form.Item className='mt-5' label='共识服务器' colon={false}>
              <Counter
                minValue={1}
                defaultValue={project.orders.length}
                onIncrement={this.onAddOrders.bind(this)}
                onDecrement={this.onMinusOrders.bind(this)}
              />
            </Form.Item>
            {
              project.orders.map((order, index) => {
                return (
                  <Server
                    key={index}
                    form={form}
                    isChecked={false}
                    isDisable={false}
                    decoratorName={`orders[${index}].orderIp`}
                    value={order.orderIp}
                  />
                )
              })
            }
          </div>
          <div className={styles.formSep}
               style={{marginBottom: '-40px'}}>
            <Button className={styles.btnSubmit}
                    onClick={this.onSubmit.bind(this)}
                    type='primary'
                    loading={loading.models.project}
                    htmlType='submit'>提交申请</Button>
          </div>
        </Form>
        <FormHelperPanel/>
      </div>
    );
  }
}

export default connect(project => project)(Form.create()(AddForm));
