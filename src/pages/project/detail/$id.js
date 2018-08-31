import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button
} from 'antd';
import {rules} from '../../../utils/rules';
import {Counter} from '../../../components/counter';
import auth from '../../../utils/auth';
import {Server} from '../components/serverAdder/server';
import {FormHelperPanel} from '../components/formHelperPanel';
import {WrapMessage} from '../components/wrapMessage';
import styles from '../form.less';

class ProjectDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'menu/updateProjectMenu'
    });
  }
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

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'project/saveProject',
          payload: {
            id: this.props.project.id || '',
            projectName: values.projectName,
            domain: values.domain,
            orgs: this.getOrgs(values.orgs),
            orders: this.getOrders(values.orders)
          }
        });
      }
    });
  }

  onResaveProject(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'project/resaveProject',
          payload: {
            id: this.props.project.id || '',
            ...values
          }
        });
      }
    });
  }

  onDeploy() {
    this.props.dispatch({
      type: 'project/deployProject',
      payload: {
        id: this.props.project.id
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

  getStatusForm() {
    const {project, loading} = this.props;
    const {status} = project;
    const user = auth.getUser();
    const isUser = user && user.role === 'user';

    if (status === 'saved') {
      return (
        <div className={styles.formSep}
             style={{marginBottom: '-40px'}}>
          <Button className={styles.btnSubmit}
                  onClick={isUser ? this.onSubmit.bind(this) : this.onResaveProject.bind(this)}
                  type='primary'
                  loading={loading.models.project}
                  htmlType='submit'>{isUser ? '提交审核' : '审核'}</Button>
        </div>
      )
    }
    if (status === 'resaved' && isUser) {
      return (
        <div className={`${styles.formSep} pt-4 pb-6`}
             style={{marginBottom: '-40px'}}>
          <Button className={styles.btnSubmit}
                  onClick={this.onDeploy.bind(this)}
                  type='primary'
                  loading={loading.models.project}
                  htmlType='submit'>部署</Button>
        </div>
      )
    }
  }

  render() {
    const {form, project} = this.props;
    const {orgs, orders, status} = project;
    const orgsCount = orgs.length;
    const ordersCount = orders && orders.length;
    const {getFieldDecorator} = form;
    const user = auth.getUser();
    const {role} = user;
    const disabled = status !== 'saved' || status === 'saved' && role !== 'user';
    const isServerDisabled = status !== 'saved';
    const getOrgsAndOrders = () => {
      return (
        <React.Fragment>
          <Form.Item className='mt-6' label='组织数量'
                     colon={false}>
            {
              <Counter
                disabled={disabled}
                minValue={2}
                maxValue={10}
                defaultValue={orgsCount}
                onIncrement={this.onAddOrgs.bind(this)}
                onDecrement={this.onMinusOrgs.bind(this)}
              />
            }
          </Form.Item>
          {
            orgs.map((org, index) => {
              const decoratorName = `orgs[${index}]`;
              return (
                <div className={`${styles.formItemChildContainer} mb-4`}
                     key={index}>
                  <Form.Item className='mb-4' label='组织ID'
                             colon={false}>
                    {getFieldDecorator(`${decoratorName}.orgId`, {
                      initialValue: org.orgId,
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [
                        {
                          required: true,
                          whitespace: false,
                          type: 'string',
                          message: <WrapMessage msg='请输入组织ID'/>,
                        },
                        {
                          validator: this.validateSameOrgId.bind(this, index),
                        }
                      ]
                    })(
                      <Input disabled={disabled}
                             type='text'
                             placeholder='请输入组织ID'/>
                    )}
                  </Form.Item>
                  <Form.Item className='my6 mb-4'
                             label='节点' colon={false}>
                    <Counter
                      disabled={disabled}
                      minValue={2}
                      defaultValue={org.peers.length}
                      onIncrement={this.onAddPeers.bind(this, index)}
                      onDecrement={this.onMinusPeers.bind(this, index)}
                    />
                  </Form.Item>
                  {
                    org.peers && org.peers.map((peer, index) => {
                      return (
                        <Server
                          key={`orgs-${index}`}
                          serverEnv={peer.serverEnv}
                          isDisable={isServerDisabled}
                          isChecked={peer.peerIp !== '' || user.role === 'manager'}
                          form={form}
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
              {
                <Counter
                  disabled={disabled}
                  minValue={1}
                  maxValue={4}
                  defaultValue={ordersCount}
                  onIncrement={this.onAddOrders.bind(this)}
                  onDecrement={this.onMinusOrders.bind(this)}
                />
              }
            </Form.Item>
            {
              orders.map((order, index) => {
                return (
                  <Server
                    index={index}
                    key={`order-${index}`}
                    serverEnv={order.serverEnv}
                    isDisable={isServerDisabled}
                    isChecked={order.orderIp !== '' || user.role === 'manager'}
                    form={form}
                    decoratorName={`orders[${index}].orderIp`}
                    value={order.orderIp}
                  />
                )
              })
            }
          </div>
        </React.Fragment>
      );
    };

    return (orgsCount && ordersCount) ?
      <div className={styles.projectFormContainer}>
        <Form className={styles.form}>
          <Form.Item label='项目名称' colon={false}>
            {getFieldDecorator('projectName', {
              initialValue: project.projectName,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: false,
                message: <WrapMessage msg='请输入项目名称.'/>,
              }]
            })(
              <Input disabled={disabled}
                     type='text'
                     placeholder='请输入项目名称'/>
            )}
          </Form.Item>
          <Form.Item label='域名' colon={false}>
            {getFieldDecorator('domain', {
              initialValue: project.domain,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: false,
                type: 'string',
                message: <WrapMessage msg='输入域名格式不正确，请重新输入'/>,
                pattern: rules.domain
              }]
            })(
              <Input disabled={disabled}
                     type='text'
                     placeholder='请输入域名（例:domain.com）'/>
            )}
          </Form.Item>
          {
            getOrgsAndOrders()
          }
          {
            this.getStatusForm()
          }
        </Form>
        <FormHelperPanel/>
      </div>
      :
      null
  }
}

export default connect(({project, menu, loading}) => ({project, menu, loading}))(Form.create()(ProjectDetailForm));
