# 十九册与一册 · 颜毓蘅纪念文献

纯静态站点。没有框架、没有构建步骤、没有后端、没有数据库。
一个文件夹拷到哪里都能跑。

---

## 结构

```
index.html              主站：序 / 留下的书 / 书架上的空位 / 六篇 / 人 / 湖 / 源 / 后记
lun-guojia.html         深页：《页面上端的字》
assets/css/fonts.css    字体声明（霞鹜文楷 Lite 分片 + EB Garamond）
assets/css/style.css    全部样式
assets/js/site.js       灯箱、选读折叠、全页/天头切换（约 100 行）
assets/fonts/           字体文件（woff2）
assets/img/             全部图片（webp）
tools/process_images.py 图片压缩脚本（改了原图才需要重跑）
plans/                  四份方案与推荐方案（不进站）
.venv/                  图片脚本用的 Python 环境（不进站）
```

**首屏只加载 1 张图（112 KB）与两三个字体分片。** 其余图片 `loading="lazy"`。

---

## 改文字

直接改 `index.html` / `lun-guojia.html` 里的中文段落。没有 Markdown、没有模板语法。

改完刷新即可，不用编译。

**字号、行距、颜色**在 `assets/css/style.css` 顶部的 `:root` 里：

```css
--paper: #F6F2E9;   /* 纸色 */
--ink:   #23211E;   /* 墨色 */
--lake:  #2E4A63;   /* 马蹄湖蓝，用于链接 */
--seal:  #7B2B2B;   /* 印章朱，只用于书影 */
```

---

## 换图

1. 把新图放进 `assets/img/`
2. 在 `tools/process_images.py` 的 `JOBS` 里加一行，或改现有的
3. 重跑：

```bash
unset PYTHONHOME PYTHONPATH
.venv/Scripts/python.exe tools/process_images.py
```

（`PYTHONHOME` 必须清掉，本机环境变量指向另一个 Python，不清会报 SRE 错误。）

---

## 上线（EdgeOne Pages 国内站）

1. 登录腾讯云 → 边缘安全加速平台 → Pages → 新建项目
2. 选「直接上传」或接 Git 仓库（推荐 Git，改一次推一次就自动重建）
3. **加速区域选「全球（不含中国大陆）」以外的默认项时注意：自定义域名要 ICP 备案；先用平台分配的默认域名则不需要**
4. 构建命令留空，输出目录填 `/`（这是纯静态站，不需要构建）
5. 上传后得到 `xxx.edgeone.app` 形式的地址，国内可直接访问

**要绑自己的域名**，先确认该域名已备案；没有备案就先别绑，用默认域名。

---

## 上线前还要做的四件事

1. **填邮箱。** 两页底部的 `<a href="mailto:">待填</a>` 换成真地址。
2. **核一遍人名与年份。** 六篇正文照《十九册与一册》送校版录入；环衬题名已改作 `Wu. Jen Sou`。
3. **确认湖面那张。** 图下有一行「情景示意 · Illustrative reconstruction」，**不要删**——它没有替代品，但也不能冒充当日照片。
4. **《论国家》天头尚未转写。** 页面上已明说。要补，需先请家族校订字迹，再另起一节；**不要凭猜写**。

---

## 已知的取舍

- **字体自托管，不用 CDN。** Google Fonts 在大陆不可达；霞鹜文楷按 unicode-range 分 97 片，浏览器只取用到的那几片。
- **没有搜索、没有评论、没有留言。** 六篇不需要搜索；评论要审核，先不做。
- **没有影片。** 先上线，影片日后单独做。
- **不绑定任何平台的专有功能。** 换托管就是把文件夹拷过去。
