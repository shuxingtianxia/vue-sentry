import { serviceForMock } from '@/api/service'
import Adapter from 'axios-mock-adapter'
const mock = new Adapter(serviceForMock)
// 登录
mock.onGet('/service1/tms-portal/user/login', { email: 'TMS_TEST_02', password: '123456' }).reply(200, {
  code: 200,
  data: 'abc'
})

mock.onGet('/service1/tms-portal/user/refresh/token').reply(200, {
  code: 200,
  data: 'abcd'
})

// 获取表头数据
mock.onGet('/head/list').reply(200, {
  code: 200,
  data: [
    {
      label: '收货地址',
      value: 'toAddress'
    },
    {
      label: '路径编号',
      value: 'code'
    },
    {
      label: '起始国家',
      value: 'fromCountry'
    },
    {
      label: '始发地',
      value: 'fromCity'
    },
    {
      label: '起运地地址',
      value: 'fromAddress'
    },
    {
      label: '目的地',
      value: 'toCity'
    }
  ]
})

// 下拉的数据
mock.onPost('/service1/tms-portal/factoryWarehouse/all').reply(200, {
  code: 200,
  data: [{ 'country': '中国', 'address': '惠州市仲恺高新开发区陈江街道海格路1号', 'code': 'K160038', 'updatedBy': '', 'city': '惠州仲恺', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '余超/罗静德', 'createdTime': 1628740158000, 'fullName': '惠州海格科技股份有限公司', 'tel': '18818664249/13692711594', 'id': '875345199931326464', 'shortName': '惠州海格' }, { 'country': 'India', 'address': 'Plot No. A-58 & 59, Sector -64, Noida, U.P., India', 'code': 'K157027', 'updatedBy': '', 'city': 'India', 'createdBy': 'TMS_TEST_02_测试2', 'contact': 'liki', 'createdTime': 1628740158000, 'fullName': 'MCM Telecom Equipment Private Limited', 'tel': '0091-9821395606', 'id': '875345200292036608', 'shortName': '印度MCM' }, { 'country': 'India', 'address': 'B-32 sector 48,Near anytime fitness Gym,NOIDA,Gautam Buddha Nagar, Uttar Pradesh,India,  201301', 'code': 'C6000', 'updatedBy': '', 'city': 'India', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '孙成明', 'createdTime': 1628740158000, 'fullName': 'Wingtech Mobile Communications (India) Private Limited', 'tel': '13621577645', 'id': '875345200245899264', 'shortName': '印度闻泰' }, { 'country': '中国', 'address': '安徽省合肥经济技术开发区云谷路3188-1号（合肥出口加工区内）', 'code': 'K160041', 'updatedBy': '', 'city': '安徽合肥', 'createdBy': 'TMS_TEST_02_测试2', 'contact': 'Vinson', 'createdTime': 1628740158000, 'fullName': '联宝（合肥）电子科技有限公司', 'tel': '18656067392', 'id': '875345200199761920', 'shortName': '合肥LCFC' }, { 'country': '中国', 'address': '武汉市东湖新技术开发区高新四路19号', 'code': 'K150009', 'updatedBy': '', 'city': '湖北武汉', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '刘艳梅', 'createdTime': 1628740158000, 'fullName': '摩托罗拉（武汉）移动技术通信有限公司', 'tel': '17371077130 ', 'id': '875345200157818880', 'shortName': '武汉联想' }, { 'country': '中国', 'address': '浙江省嘉兴市南湖区大桥镇亚中路777号3幢2号厂房3层', 'code': 'V1500', 'updatedBy': '', 'city': '嘉兴永瑞', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '姜志陆/ 邓茂林', 'createdTime': 1628740158000, 'fullName': '嘉兴永瑞电子科技有限公司', 'tel': '邱欣琴', 'id': '875345199843246080', 'shortName': '永瑞' }, { 'country': '中国', 'address': '江苏省无锡市新吴区长江南路11号', 'code': 'V2100', 'updatedBy': '', 'city': '江苏无锡', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '张鑫', 'createdTime': 1628740158000, 'fullName': '闻泰科技（无锡）有限公司', 'tel': '13609143583', 'id': '875345199889383424', 'shortName': '无锡闻泰' }, { 'country': 'INDONESIA', 'address': ' KAWASAN INDUSTRI CANDI JI. GATOT SUBROTO BLOK 23A   NO.5 SEMARANG INDONESIA', 'code': 'C6300', 'updatedBy': '', 'city': 'INDONESIA', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '陈治勇', 'createdTime': 1628740158000, 'fullName': 'PT WINGTECH TECHNOLOGY INDONESIA', 'tel': '15900404512', 'id': '875345200388505600', 'shortName': '印尼闻泰' }, { 'country': '中国', 'address': '广东省惠州市仲恺高新区陈江街道南华路80号', 'code': 'K160034', 'updatedBy': '', 'city': '惠州仲恺', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '刘卫/朱志军', 'createdTime': 1628740158000, 'fullName': '创维液晶器件（深圳）有限公司仲恺分公司', 'tel': '18318283930/18679261195', 'id': '875345199998435328', 'shortName': '惠州创维' }, { 'country': '中国', 'address': '广东省惠州市大亚湾石化大道西38号星华工业园十栋四楼', 'code': 'K160000', 'updatedBy': '', 'city': '广东惠州', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '胡小猛', 'createdTime': 1628740158000, 'fullName': '惠州大亚湾光弘科技有限公司', 'tel': '13536253169', 'id': '875345200065544192', 'shortName': '惠州光弘' }, { 'country': '中国', 'address': '河源市源城区高新区', 'code': 'K160035', 'updatedBy': '', 'city': '广东河源', 'createdBy': 'TMS_TEST_02_测试2', 'contact': '吴彬彬', 'createdTime': 1628740158000, 'fullName': '西可通讯有限公司', 'tel': '13922965850', 'id': '875345200111681536', 'shortName': '西可' }, { 'country': '中国', 'address': '京东', 'code': 'f123', 'updatedBy': '', 'city': '深圳', 'createdBy': 'TMS_TEST_02_测试2', 'createdTime': 1628501795000, 'fullName': '深圳', 'id': '874345428642955264', 'shortName': '文泰' }, { 'country': '中国', 'address': 'asdada', 'code': 'sadasd', 'updatedBy': '', 'city': 'asdad', 'fullName': 'asdadasd', 'createdBy': '', 'contact': 'dadadada', 'createdTime': 1628232418000, 'postCode': 'adasd', 'tel': 'adadad', 'id': '873215583443746816', 'email': 'ada' }, { 'country': '中国', 'address': 'string', 'code': 'string', 'updatedBy': 'string', 'city': 'string', 'fullName': 'string', 'createdBy': '', 'contact': 'string', 'createdTime': 1628220389000, 'postCode': 'string', 'tel': 'string', 'id': '873165128466432000', 'shortName': 'string', 'email': 'string' }, { 'country': '中国', 'updatedTime': 1628146481000, 'address': 'fsdf', 'code': 'aaa123', 'updatedBy': '', 'city': 'fsa', 'fullName': 'fsd', 'createdBy': '', 'contact': '18685945214/19658452145', 'createdTime': 1628143723000, 'postCode': 'fsa', 'tel': '18685945214/19658452145', 'id': '872843568123740160', 'shortName': 'fsda', 'email': 'fsad' }, { 'country': '中国', 'updatedTime': 1627629115000, 'address': '123', 'code': 'test3', 'updatedBy': '', 'city': '123', 'fullName': '123', 'createdBy': '', 'contact': '123', 'createdTime': 1627629115000, 'postCode': '123', 'tel': '123', 'id': '870688197250646016', 'email': '123' }, { 'country': '中国', 'updatedTime': 1627629083000, 'address': '123', 'code': 'test2', 'updatedBy': '', 'city': '123', 'fullName': '123', 'createdBy': '', 'contact': '123', 'createdTime': 1627629083000, 'postCode': '123', 'tel': '123', 'id': '870687953226039296', 'email': '123' }, { 'country': '中国', 'updatedTime': 1627629012000, 'address': '123', 'code': 'test1', 'updatedBy': '', 'city': '123', 'fullName': '123', 'createdBy': '', 'contact': '123', 'createdTime': 1627629012000, 'postCode': '123', 'tel': '123', 'id': '870687766055223296', 'email': '123' }, { 'country': '中国', 'updatedTime': 1627628821000, 'address': '123', 'code': 'test', 'updatedBy': '', 'city': '123', 'fullName': '123', 'createdBy': '', 'contact': '123', 'createdTime': 1627628821000, 'postCode': '1234567890', 'tel': '123', 'id': '870686963986857984', 'email': '123' }, { 'country': '中国', 'updatedTime': 1627630530000, 'address': '123', 'code': '123', 'updatedBy': '', 'city': '123', 'fullName': '123', 'createdBy': '', 'contact': '123', 'createdTime': 1627279353000, 'postCode': '123', 'tel': '123', 'id': '869218135943675904', 'email': '123' }]
})

// 获取菜单权限
mock.onGet('/service1/tms-portal/user/getMenuList').reply(200, {
  code: 200,
  data: [
    {
      'systemId': 'TMS',
      'cache': 0,
      'isShowMenu': 1,
      'icon': '',
      'typeName': '目录',
      'pageSize': 10,
      'sort': 1,
      'createAccount': '202106013',
      'type': 1,
      'url': '/systemManage',
      'systemName': 'TMS系统',
      'children': [
        {
          'systemId': 'TMS',
          'cache': 0,
          'isShowMenu': 1,
          'icon': '',
          'typeName': '目录',
          'pageSize': 10,
          'sort': 0,
          'createAccount': '202106013',
          'type': 1,
          'url': 'module',
          'systemName': 'TMS系统',
          'parentCode': '1001',
          'children': [],
          'createTime': '2021-09-17T09:36:03.000+0800',
          'componentPath': '/path/index',
          'authorityCode': '1001002',
          'chineseName': '模块管理',
          'componentName': 'ModuleSystemManage',
          'currentPage': 1
        },
        {
          'systemId': 'TMS',
          'cache': 0,
          'isShowMenu': 1,
          'icon': '',
          'typeName': '目录',
          'pageSize': 10,
          'sort': 0,
          'createAccount': '202106013',
          'type': 1,
          'url': 'dataDict',
          'systemName': 'TMS系统',
          'parentCode': '1001',
          'children': [],
          'createTime': '2021-09-17T09:34:06.000+0800',
          'componentPath': '/path/add',
          'authorityCode': '1001001',
          'chineseName': '数据字典',
          'componentName': 'DataDictSystemManage',
          'currentPage': 1
        }
      ],
      'createTime': '2021-09-23T09:36:01.000+0800',
      'componentPath': '',
      'authorityCode': '1001',
      'chineseName': '基础功能',
      'componentName': 'SystemManage',
      'currentPage': 1
    }
  ]
})

// 获取多语言
mock.onGet('/service1/tms-portal/language').reply(200, {
  code: 200,
  data: [
    {
      en: 'haha',
      zh: '配置',
      code: 'inl8111'
    },
    {
      en: 'wwwwwww',
      zh: 'systemManage1',
      code: 'inl8112'
    }
  ]
})
