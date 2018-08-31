import React from 'react';
import router from 'umi/router';
import {Icon} from 'antd';
import styles from './terms.less';

export default class Terms extends React.Component {
  render() {
    return (
      <div className={styles.overlay}>
        <div className={styles.terms}>
          <h2>链佰BaaS测试协议</h2>
          <p>欢迎使用链佰BaaS，请仔细阅读以下协议，确保您在使用中的权责。</p>

          <p>链佰BaaS测试协议条款</p>

          <p>在您申请测试会员试用之前，请您仔细阅读本服务条款的全部内容。如果您有任何意见及建议的，请登录访问链佰BaaS官方网站（http://lianbai.io）反馈版区，进行交流。如果您不同意本服务或本服务条款的任意内容，或者无法准确理解链佰BaaS的解释，请不要进行后续操作。一旦您注册并进行后续操作，即表示您同意遵循本服务条款之所有约定以及http://lianbai.io网站上公布的相关规范、规则和使用流程。届时您不应以未阅读本服务条款的内容或者未获得链佰BaaS对您问询的解答等理由，主张本服务条款无效，或要求撤销本服务条款。</p>

          <p>1.
            本服务条款是您因申请成为链佰BaaS平台会员与链佰Baas所订立的有效合约。一旦您注册并进行后续操作，即表示您同意遵循本服务条款之所有约定。</p>

          <p>2.
            “链佰BaaS官方网站”是指：http://lianbai.io，简称链佰BaaS，是包含web应用开发服务平台等网站平台。</p>
          <p>3. 您应自行判断链佰BaaS服务与您选择适用的操作系统、云服务器等软件、硬件等产品或服务的适配性。
          </p>
          <p>4.在您使用链佰BaaS服务前，您应仔细阅读链佰BaaS就该服务在链佰BaaS网站上的服务说明，依照相关操作指引进行操作，请您自行把握风险谨慎操作。如未按照相关指引操作可能导致包括但不限于数据记录读写错误、性能低下、数据被删除、服务中断等后果，您理解可能发生的后果，并将对自行操作行为产所生的结果负责。
          </p>
          <p>5.尽管在免费试用期间，使用链佰BaaS服务您不需付费，但您通过服务获得并使用的链佰BaaS其他付费服务，除非双方另有约定，您应按照该服务届时有效的收费标准向链佰BaaS支付相应服务费用。
          </p>
          <p>6.您应理解并同意，虽然链佰BaaS会提供服务可用性和可靠性支撑，但在测试试用期间，链佰BaaS将不对任何服务可用性、可靠性做出承诺。链佰BaaS亦不对您使用链佰BaaS的工作或结果承担任何责任。
          </p>
          <p>7.您不应进行任何破坏或试图破坏网络安全的行为（包括但不限于钓鱼，黑客，网络诈骗，网站或空间中含有或涉嫌散播：病毒、木马、恶意代码，及通过虚拟服务器对其他网站、服务器进行涉嫌攻击行为如扫描、嗅探、ARP欺骗、DDoS等）。
          </p>
          <p>8. 您不应进行任何改变或试图改变链佰BaaS提供的系统配置或破坏系统安全及网络安全的行为。
          </p>
          <p>9.
            您不应修改、翻译、改编、出租、转许可、在信息网络上传播或转让链佰BaaS提供的软件或服务，也不得逆向工程、反编译或试图以其他方式发现链佰BaaS提供的软件的源代码。
          </p>
          <p>10. 您不得将免费试用活动期间的试用产品用于商用用途，否则由此导致的任何损失及责任，均由您自行承担。
          </p>
          <p>11.对于因电信系统、互联网网络故障、系统/服务升级或应用程序编程接口关闭或软件故障、将被创建的服务资源/实例不足以及不可抗力等原因，致使测试产品/服务创建或释放服务失败及运行期间故障、终止等情况，由此产生的后果及损失，链佰BaaS将不承担任何责任。
          </p>
          <p>12.链佰BaaS发现您利用链佰BaaS进行非法业务或对链佰BaaS网站及服务进行攻击，或发生其他违法、违规和违反本服务条款的行为，链佰BaaS将保留在未通知您即暂停或终止您的链佰BaaS服务的权利，而无须承担任何义务和责任。
          </p>
          <p>13.如因您使用链佰BaaS服务时遭遇计算机病毒、网络入侵和攻击破坏（包括但不限于DDoS）等危害网络安全事项或行为（以下统称该等行为），而该等行为给链佰BaaS带来危害，或影响链佰BaaS与国际互联网或者链佰BaaS与特定网络、服务器及链佰BaaS内部的通畅联系，链佰BaaS将保留在未通知您即暂停或终止您的链佰BaaS服务的权利，而无须承担任何义务和责任。
          </p>
          <p>14. 链佰BaaS可提前10个工作日通过发网站内公告或在网站内合适版面发通知的方式终止本服务条款，而无须承担任何义务和责任。
          </p>
          <p>15. 不论因何种原因，服务终止后，链佰BaaS有权不再保存您的数据，即释放该实例并清空配置数据。
          </p>
          <p>16. 您及链佰BaaS都应对因本服务而获得的对方的保密信息承担保密责任。
            保密信息指由一方向另一方披露的所有技术及非技术信息(包括但不限于产品资料，产品计划，价格，财务及营销规划，业务战略，客户信息，客户数据，研发，软件硬件，API应用数据接口，技术说明，设计，特殊公式，特殊算法等)。除非国家机关依法强制要求或上述保密信息已经进入公有领域外，接受保密信息的一方不得对外披露。
          </p>
          <p>17.您理解并同意，链佰BaaS仅在免费试用活动期内免费为您提供链佰BaaS服务，在免费试用活动结束后，链佰BaaS将通过发网站内公告或在网站内合适版面发通知等方式公布收费政策及规则。如您需继续使用链佰BaaS服务，您应按届时链佰BaaS公布之收费政策及规则支付服务费用。
          </p>
          <p>18.
            链佰BaaS有权随时根据有关法律、法规的变化以及公司经营状况和经营策略的调整等修改本服务条款。修改后的服务条款会在链佰BaaS网站（http://lianbai.io）上公布。如果不同意修改的内容，您应停止使用链佰BaaS服务，如果继续使用链佰BaaS服务，则视为您接受本服务条款的变动。
          </p>
          <p>19.您对自己存放在链佰BaaS链佰BaaS中的数据内容负责，链佰BaaS提示您谨慎判断数据内容的合法性并对此予以监督，如因上传、储存的内容违反法律法规、部门规章或国家政策或危害国家安全，由此造成的全部结果及责任由您自行承担，并且链佰BaaS将保留在未通知您即暂停或终止您的链佰BaaS服务的权利及删除相应信息的权利，而无须承担任何义务和责任。
          </p>
          <p>20.
            本服务条款受中华人民共和国法律管辖。在执行本服务条款过程中如发生纠纷，双方应及时协商解决。协商不成时，任何一方可直接向法院提起诉讼。
          </p>
        </div>
        <button className={styles.btnCircleClose} onClick={() => {
          router.go(-1);
        }}><Icon
          type='close'/></button>
      </div>
    );
  }
}