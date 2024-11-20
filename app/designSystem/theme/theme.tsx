import { theme } from 'antd'

export const Theme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Colors
    colorPrimary: '#0066FF',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: 'black',
    colorLink: '#0066FF',
    colorBgBase: 'white',
    colorBgContainer: 'white',
    colorBorder: '#d4d4d8',
    colorBorderSecondary: '#e4e4e7',
    colorSplit: 'rgba(24, 24, 27, 0.07)',
    // Typography
    fontFamily: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    //Form
    controlItemBgActive: '#f4f4f5',
    controlOutline: 'rgba(24, 24, 27, 0.1)',
    controlHeight: 36,
    controlHeightSM: 32,

    // Layout
    padding: 16,
    boxShadow:
      '0 6px 16px 0 rgba(0, 102, 255, 0.15), 0 3px 6px -4px rgba(0, 102, 255, 0.2), 0 9px 28px 8px rgba(0, 102, 255, 0.1)',
    borderRadius: 12,
    lineType: 'solid',
    lineWidth: 1,
    motion: true,
  },
  components: {
    Form: {
      itemMarginBottom: '22px',
    },
    Button: {
      paddingInlineSM: 11,
      fontWeight: 500,
      transition: 'all 0.2s ease-in-out',
      hover: {
        boxShadow: '0 0 12px rgba(0, 102, 255, 0.5)',
      }
    },

    Layout: {
      headerBg: 'white', // topBar background color
      footerBg: 'white', // footer background color
      siderBg: 'white', // leftBar background color
      siderBorderRight: '1px solid #e4e4e7', // leftBar border right
      headerBorderBottom: '1px solid #e4e4e7', // topBar border bottom
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      //topbar menu items
      horizontalItemSelectedColor: 'black',
      horizontalItemSelectedBg: 'transparent',
      //leftbar menu items
      itemSelectedColor: 'black',
      itemSelectedBg: 'transparent',
      itemActiveBg: 'transparent',
      //topbar and leftbar menu items
      itemHoverColor: 'black',
      itemHoverBg: 'transparent',
      itemColor: '#909090',
      itemBg: 'transparent',
      iconMarginInlineEnd: 8,
      iconSize: 16,
    },
  },
}
