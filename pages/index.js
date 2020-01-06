import React, { useState, useMemo } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Select, Row, Col, Divider, Icon } from 'antd';

function rem($px) {
  return `${(10 * $px) / 1280}rem`;
}

moment.locale('zh-CN');
const { Option } = Select;
function Index(props) {
  const { goldNews = [], githubNews = [] } = props;
  const [goldList, setGoldList] = useState([]);
  const [newsList, setNewsList] = useState([]);

  const [category, setCategory] = useState(getCategories.defaultValue);
  const [lang, setLang] = useState(getLangList.defaultValue);
  const onCategoryChange = async value => {
    setCategory(value);
    const dataList = await fetchGold(category);
    setGoldList(dataList);
  };
  const onLangChange = async value => {
    setLang(value);
    const dataList = await fetchGithub(value);
    setNewsList(dataList);
  };

  return (
    <div className="wrap">
      <div className="gold-pane">
        <div className="filter">
          <img
            className="juejin-icon"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgWDcgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iOC4zODU3bW0iIGhlaWdodD0iOC4xOTIzbW0iIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIgp2aWV3Qm94PSIwIDAgNTA5IDQ5NyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxkZWZzPgogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+CiAgIDwhW0NEQVRBWwogICAgLmZpbDAge2ZpbGw6IzAwNkNGRn0KICAgIC5maWwxIHtmaWxsOndoaXRlfQogICBdXT4KICA8L3N0eWxlPgogPC9kZWZzPgogPGcgaWQ9IuWbvuWxgl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxyZWN0IGNsYXNzPSJmaWwwIiB3aWR0aD0iNTA5IiBoZWlnaHQ9IjQ5NyIvPgogIDxwYXRoIGlkPSJGaWxsLTEtQ29weSIgY2xhc3M9ImZpbDEiIGQ9Ik0yODUgMTM4bC0zMSAtMjQgLTMzIDI1IC0yIDIgMzUgMjcgMzQgLTI3IC0zIC0zem0xMTkgOTVsLTE1MCAxMTYgLTE1MSAtMTE2IC0yMiAxNyAxNzMgMTM0IDE3MyAtMTM0IC0yMyAtMTd6bS0xNTAgOWwtODIgLTYzIC0yMyAxNyAxMDUgODEgMTA0IC04MSAtMjIgLTE3IC04MiA2M3oiLz4KIDwvZz4KPC9zdmc+Cg=="
            alt="掘金"
          />
          <span className="juejin-font">掘金</span>
          <Select
            style={{ width: 120 }}
            value={category}
            onChange={onCategoryChange}
          >
            {getCategories().map(({ key, label }) => (
              <Option key={key} value={key}>
                {label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="content">
          {(goldList.length ? goldList : goldNews).map(
            ({ title, date, collectionCount, user, id }) => (
              <div key={id} className="gold-item">
                <div className="collectionCount">{collectionCount}</div>
                <div className="gold-info">
                  <div className="gold-title">{title}</div>
                  <div className="gold-footer">
                    <span className="date">{moment(date.iso).fromNow()}</span>
                    <a href={user.url} className="username">
                      {user.username}
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="github-pane">
        <div className="filter">
          <img
            className="juejin-icon"
            src="https://e-gold-cdn.xitu.io/static/github.png?9140c37"
            alt="github"
          />
          <span className="juejin-font github-font">GitHub</span>
          <div className="lang-selects">
            <Select style={{ width: 120 }} value={lang} onChange={onLangChange}>
              {getLangList().map(({ key, label }) => (
                <Option key={key} value={key}>
                  {label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="content">
          <Row gutter={[12, 12]}>
            {(newsList.length ? newsList : githubNews).map(
              ({
                id,
                url,
                username,
                reponame,
                description,
                starCount,
                forkCount,
                langColor,
                lang
              }) => (
                <Col key={id} span={24} xl={12}>
                  <div className="github-card">
                    <div className="title">
                      <a href={url} className="link-title">
                        <span>{username}</span>
                        <span className="title-divider"> / </span>
                        <span>{reponame}</span>
                      </a>
                    </div>
                    <div className="description">{description}</div>
                    <div className="footer">
                      <span>
                        <Icon type="star" theme="filled"></Icon>
                        <span className="label">{starCount}</span>
                      </span>
                      <span>
                        <Icon type="fork" />
                        <span className="label">{forkCount}</span>
                      </span>
                      {lang && (
                        <span>
                          <span
                            className="lang-color"
                            style={{ backgroundColor: langColor }}
                          ></span>
                          <span className="label">{lang}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Col>
              )
            )}
          </Row>
          <Divider>
            <div className="bottom-text">已显示全部内容</div>
          </Divider>
        </div>
      </div>
      <style jsx global>{`
        html {
          font-size: 10vw;
        }
        html body {
          height: 100%;
          background-color: #eceff1;
        }
        #__next {
          height: 100%;
        }
      `}</style>
      <style jsx>{`
        .bottom-text {
          padding-top: ${rem(16)};
          color: #c2c5cd;
          font-weight: 400;
          font-size: ${rem(14)};
        }
        .lang-color {
          display: inline-block;
          vertical-align: center;
          font-size: 0;
          line-height: 0;
          width: 12px;
          height: 12px;
          border-radius: 12px;
        }
        .juejin-icon {
          width: ${rem(30)};
          height: ${rem(30)};
          margin-right: ${rem(8)};
        }
        .juejin-font {
          margin-right: ${rem(6)};
          color: rgb(4, 74, 171);
          font-size: ${rem(16)};
        }
        .github-font {
          color: rgb(0, 0, 0);
        }
        .wrap {
          height: 100%;
          display: flex;
          overflow: hidden;
          padding: ${rem(20)} ${rem(18)} 0 ${rem(18)};
        }
        .gold-pane {
          width: ${rem(500)};
          height: 100%;
          flex: none;
          display: flex;
          flex-direction: column;
          margin-right: ${rem(18)};
        }
        .github-pane {
          flex: auto;
          display: flex;
          flex-direction: column;
        }
        .filter {
          flex: none;
          display: flex;
          align-items: center;
          padding: 0 ${rem(8)};
          height: ${rem(42)};
          background-color: #fff;
          border-radius: ${rem(2)};
          margin-bottom: ${rem(16)};
          margin-right: ${rem(12)};
        }
        .content {
          flex: auto;
          overflow: auto;
          padding-right: ${rem(12)};
        }
        .lang-selects {
          flex: auto;
          text-align: right;
        }
        .gold-item {
          background-color: #fff;
          border-radius: ${rem(2)};
          display: flex;
          align-items: center;
          padding: ${rem(6)} ${rem(5)};
        }
        .content > .gold-item + .gold-item {
          margin-top: ${rem(10)};
        }
        .collectionCount {
          background-color: #1683fc;
          color: #fff;
          height: ${rem(40)};
          width: ${rem(30)};
          border-radius: ${rem(2)};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: ${rem(12)};
          flex: none;
        }
        .gold-info {
          flex: auto;
          min-width: 0;
        }
        .gold-title {
          color: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 1.8;
          font-size: ${rem(14)};
        }
        .gold-footer {
          color: #c2c5cd;
          font-size: ${rem(12)};
        }
        .date {
          margin-right: ${rem(10)};
        }
        .username {
          color: #c2c5cd;
        }
        .github-card {
          background-color: #fff;
          padding: ${rem(16)};
          border-radius: ${rem(2)};
        }
        .link-title {
          color: rgb(3, 102, 214);
          font-size: ${rem(14)};
        }
        .description {
          height: ${rem(60)};
          overflow: hidden;
          margin-top: ${rem(10)};
        }
        .footer {
          display: flex;
          align-items: center;
          margin-top: ${rem(10)};
        }
        .footer > span {
          margin-right: ${rem(16)};
          display: flex;
          align-items: center;
        }
        .github-card .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .github-card .label {
          margin-left: ${rem(3)};
        }
      `}</style>
    </div>
  );
}

Index.getInitialProps = async () => {
  const [goldNews, githubNews] = await Promise.all([
    fetchGold(),
    fetchGithub()
  ]);
  return {
    goldNews,
    githubNews
  };
};

function getCategories() {
  return [
    {
      key: 'all',
      label: '首页'
    },
    {
      key: 'frontend',
      label: '前端'
    },
    {
      key: 'backend',
      label: '后端'
    },
    {
      key: 'android',
      label: 'Android'
    },
    {
      key: 'ios',
      label: 'iOS'
    }
  ];
}
getCategories.defaultValue = 'frontend';

function getLangList() {
  return [
    {
      key: 'javascript',
      label: 'JavaScript'
    },
    {
      key: 'css',
      label: 'CSS'
    },
    {
      key: 'html',
      label: 'HTML'
    },
    {
      key: 'typescript',
      label: 'TypeScript'
    },
    {
      key: 'coffeescript',
      label: 'CoffeeScript'
    }
  ];
}
getLangList.defaultValue = 'javascript';

async function fetchGold(category = 'frontend', offset = 0) {
  const res = await axios.post(
    'https://extension-ms.juejin.im/resources/gold',
    {
      data: { category, order: 'heat', offset, limit: 30 }
    }
  );
  return res.data.data;
}

async function fetchGithub(lang = 'javascript') {
  const res = await axios.post(
    'https://extension-ms.juejin.im/resources/github',
    {
      data: {
        category: 'trending',
        period: 'day',
        lang,
        offset: 0,
        limit: 30
      }
    }
  );
  return res.data.data;
}
export default Index;
