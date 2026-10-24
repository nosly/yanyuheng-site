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
assets/js/site.js       灯箱、选读折叠、全页/天头切换、联系地址拼装
assets/fonts/           字体文件（woff2）
assets/img/             全部图片（webp）
README.md
.gitignore              不进仓库、也不会被部署的目录
tools/process_images.py 图片压缩脚本（本地工具，不入库）
plans/                  四份方案与推荐方案（工作材料，不入库）
```

**首屏只加载一张图（112 KB）与两三个字体分片。** 其余图片 `loading="lazy"`。

> 本目录**自成 Git 仓库**（`site/.git`）。父目录那本书的仓库已在它的 `.gitignore` 里忽略 `/site/`，两边互不干扰。

---

## 改文字

直接改 `index.html` / `lun-guojia.html` 里的中文段落。没有 Markdown、没有模板语法，改完刷新即可。

**字号、行距、颜色**在 `assets/css/style.css` 顶部的 `:root` 里：

```css
--paper: #F6F2E9;   /* 纸色 */
--ink:   #23211E;   /* 墨色 */
--lake:  #2E4A63;   /* 马蹄湖蓝，用于链接 */
--seal:  #7B2B2B;   /* 印章朱，只用于书影 */
```

---

## 联系地址

页脚的邮箱**不在 HTML 源码里**。源码中只有两个倒序片段：

```html
<a class="mail" href="#" data-a="qrebyc" data-b="moc.qq">写信给我们</a>
```

`site.js` 在页面加载时把它们倒回来拼成 `mailto:` 与显示文字。所以：

- 抓页面的机器人（不跑 JS 的）拿不到可用的地址；扫 `mailto:` 与 `@` 的正则也扫不到。
- 读者看到的是真文字，能选中、能复制，读屏软件也念得出。
- 代价：关掉 JS 就看不到地址，页面上有 `<noscript>` 提示。

**为什么没用图片**：图片同样挡得住文本抓取，但复制不了、读屏读不出、缩放会糊，还要多一个文件。这条折中方案在防抓取上打平，在其余三项上更好。若仍想换回图片，说一声。

要改地址，改 `data-a` 与 `data-b` 两个倒序片段即可（`cyberq@qq.com` → `qrebyc` / `moc.qq`）。

---

## 换图

1. 新图放进原素材目录，在 `tools/process_images.py` 的 `JOBS` 里加一行
2. 重跑：

```bash
unset PYTHONHOME PYTHONPATH
.venv/Scripts/python.exe tools/process_images.py
```

（`PYTHONHOME` 必须清掉——本机环境变量指向另一个 Python，不清会报 SRE 错误。）

---

## 上线：EdgeOne Pages

### 先说清楚一件事：「国内可直接访问」这句，我先前说得过头了

准确的说法是：**能打开，但不保证快。** 三条事实：

1. EdgeOne 的**加速区域**三选一：中国大陆可用区 / 全球可用区 / 全球（不含中国大陆）。
2. 域名没有备案时，只能选**全球（不含中国大陆）**。选了它，站点由境外节点（香港、日本、新加坡一带）服务——大陆用户能访问，但**没有走国内节点，也就没有国内加速**；速度和稳定性看线路与时段。
3. **备案只管境内节点。** 想绑自己的域名并用大陆节点加速，就必须 ICP 备案（主体是境内单位或个人，两三周起）。

至于**平台分配的默认域名**（`xxx.edgeone.app`）：它不是「自定义域名」，一般不需要备案就能用——但我没有找到官方明文保证这一点，所以**上线后请自己验一次**，两分钟：

- 用手机 4G（不要连 Wi-Fi 代理）打开那个地址；
- 或在 `17ce.com` / `boce.com` 做一次全国测速，看各地是否都能通、耗时多少。

若日后读者主要在天津，再考虑两条路：办备案上大陆节点，或换香港 COS/OSS + CDN（免备案，比美西快，每月几美元）。

### 接 Git 仓库（推荐；不要用「直接上传」）

「直接上传」会把整个文件夹推上去——`.venv`、`plans`、`tools` 全在里面。本目录已经建好仓库和 `.gitignore`，这三样不会入库，也就不会被部署出去。

**一、在 GitHub 或 Gitee 建一个空仓库**

- 名字用 `yanyuheng-site`，**大小写与连字符要和 `git remote` 里的完全一致**。
- **选 Public（公开）**：站点本来就是要公开的；私有仓库会让 EdgeOne 多一步授权，也容易在推送时踩认证的坑。
- **不要**勾选「添加 README / .gitignore / license」——会让首次推送冲突。

> **认证**：GitHub 早已不接受账号密码。HTTPS 推送时用户名填账号，**密码位置填 Personal Access Token**。本机没有存过 GitHub 凭据，第一次推送会要你填一次，之后由 Windows 凭据管理器记住。
>
> **别在菜单里找「Developer settings」**，直接开这两个网址（菜单里它在 Settings 左侧栏最底部，要滚到底才看得见，而且必须是**账号**的 Settings，不是仓库的 Settings）：
>
> - 建仓库：`https://github.com/new`
> - 建 token：`https://github.com/settings/tokens/new`
>
> token 的设置：Note 随便写（如 `yanyuheng-site`）、Expiration 选 90 天、Scopes **只勾 `repo`**，然后 Generate，**生成后立刻复制**（只显示一次）。
>
> 若想省掉 token 这一环，装 GitHub CLI 一条命令解决：
>
> ```bash
> winget install --id GitHub.cli
> gh auth login                                   # 走浏览器登录
> gh repo create yanyuheng-site --public --source=. --remote=origin --push
> ```
>
> 这一串会同时建仓库、加 remote、推送，省掉后面两步。

**二、本地推上去**（仓库已初始化，首个提交是 `aeecf07`）

```bash
cd "E:/work/doc/mq/family/颜毓蘅/site"
git remote add origin https://github.com/<你的账号>/yanyuheng-site.git
git push -u origin main
```

Gitee 就把地址换成 `https://gitee.com/<账号>/yanyuheng-site.git`。
GitHub 若开了两步验证，密码位置要填 Personal Access Token。

**三、EdgeOne Pages 里接上**

1. 控制台 → EdgeOne Pages（新版可能叫 EdgeOne Makers）→ 新建项目 → **导入 Git 仓库**
2. 授权并选中刚才那个仓库，分支选 `main`
3. 构建配置（控制台叫法可能略有出入，按这个意思填）：
   - 框架预设：**无 / 其他（静态）**
   - 构建命令：**留空**
   - 输出目录 / 发布目录：**`/`**（留空或填 `.` 也行）
   - 根目录：留空
4. 加速区域：**全球（不含中国大陆）**
5. 部署。之后每次 `git push` 都会自动重建。

**四、验证**：按上面那两分钟的办法测一次国内可达性。

### 站点地址：项目名就是域名

EdgeOne Pages 给两个地址，别弄混：

| 地址 | 是什么 |
|---|---|
| `https://<项目名>.edgeone.dev/` | **主地址**。项目名 `yanyuheng` → `https://yanyuheng.edgeone.dev/`。对外只用这个。 |
| `https://<项目名>-<随机串>.edgeone.dev/` | 部署流程里带出来的另一个地址，随机串是系统生成的。**不是主地址**，不要对外公布。 |

所以**不需要买域名也能有干净地址**。先前本文件写过「默认域名改不了，要干净地址就得买域名」——那句话是错的，已删。随机串那个是流程里顺手给的，不是唯一的地址。

两条注意：

- **别改项目名**。改了，主域名跟着变，之前发出去的链接就断了。
- 平台子域名跟平台绑在一起。将来若换托管，`*.edgeone.dev` 带不走。

### 什么时候才需要买域名

只有一种情况值得买：**你希望这个地址不依赖 EdgeOne**。平台子域名的寿命等于平台政策的寿命；自己买的域名可以一直指向任何地方。

若哪天想买，步骤是：

1. 买域名（Cloudflare Registrar / Namecheap / 阿里云 / 腾讯云均可）。纪念文献站用 `.org` 或 `.com` 都合适。
2. EdgeOne Pages 项目 → 域名管理 → **添加自定义域名**，填 `yanyuheng.org`。
3. 到域名商的 DNS 加一条 **CNAME**，指向 EdgeOne 给出的目标地址。
4. 等证书签发（几分钟到几十分钟）。

**加速区域保持「全球（不含中国大陆）」时，绑自定义域名不需要备案**；只有要用大陆节点加速才需要。

> **若用 Cloudflare 管 DNS**：那条 CNAME 必须设为 **DNS only（灰色云）**，不能开橙色云代理。开了会变成两层 CDN，证书和回源都会出问题。

站内全是相对路径（`assets/…`、`lun-guojia.html`），**换域名不用改一行代码**。

### 若一定要用「直接上传」

**不要用软链接。** 把 `index.html`、`lun-guojia.html`、`assets/` 软链到一个 `upload/` 目录再上传，看起来聪明，实际上会栽：

- 浏览器的文件夹上传器**通常不跟随符号链接**，而失败是**静默**的——`assets/` 被跳过，站点上线后没有样式、没有图、没有字体，你要过一阵才发现。
- Windows 上 `mklink /D` 还要管理员权限或开发者模式；junction 虽然免权限，但上传器认不认，各家不一样。

用这个脚本做**真拷贝**，慢一秒，但不会骗人：

```bash
./make-dist.sh
```

它清空并重建 `dist/`，里面只有三样：`index.html`、`lun-guojia.html`、`assets/`（约 8.7 MB）。

上传时按上传器给的方式分两种：

| 上传器 | 怎么做 |
|---|---|
| 点 **「选择文件夹」** | 选 **`dist` 本身**。选中的文件夹就是站点根，`dist/index.html` 会变成 `/index.html`。 |
| **拖拽** | 拖 **`dist` 里面**的三样，别拖 `dist` 这层——有些上传器会把拖进去的文件夹当成子目录，结果站点变成 `/dist/index.html`。 |

**上传后验一下**：打开给你的预览地址，首页应该是 `https://…/`，不是 `https://…/dist/`。若是后者，说明多套了一层，重传即可。

`dist/` 已在 `.gitignore` 里，不会进仓库。

> **但要想清楚：直接上传没有自动重建。** 家里改一个字，你得记得重跑脚本、重传一次。Git 那条路是 `git push` 一次，EdgeOne 自己重建，还有历史可回滚——同样的力气，多一点东西。**能用 Git 就别用直接上传。**

---

## 上线前还差的三件事

1. **家族核一遍人名与年份。** 六篇正文照《十九册与一册》送校版录入；柯勒律治环衬题名已改作 `Wu. Jen Sou`（书稿同步订正，见 `creative/v2/勘误-送校版已交学校（2026-10-24）.md`）。
2. **确认湖面那张。** 图下有一行「情景示意 · Illustrative reconstruction」，**不要删**——它没有替代品，但也不能冒充当日照片。
3. **《论国家》天头尚未转写。** 页面上已明说。要补，须先请家族校订字迹，再另起一节；**不要凭猜写**。

---

## 已知的取舍

- **字体自托管，不用 CDN。** Google Fonts 在大陆不可达；霞鹜文楷按 unicode-range 分 97 片，浏览器只取用到的那几片。
- **没有搜索、没有评论、没有留言。** 六篇不需要搜索；评论要审核，先不做。
- **没有影片。** 先上线，影片日后单独做。
- **不绑定任何平台的专有功能。** 换托管就是把文件夹拷过去。
