import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default (props) => {
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="menu-logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="bar-chart" />
            <span className="nav-text">前端牛逼</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="cloud-o" />
            <span className="nav-text">你猜</span>
          </Menu.Item>          
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>掌众 ©2019 Created by 深圳前端团队</Footer>
      </Layout>
    </Layout>
  )
}