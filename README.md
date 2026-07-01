# 刘弘懿 Portfolio

一个用于求职面试展示的个人作品集静态网站。网站以黑白灰极简风格为主，重点展示 Leony / 刘弘懿的个人定位、项目经历、项目详情、截图视频占位、简历下载与联系方式。

## 目录结构

```text
portfolio-site/
├── index.html
├── projects/
│   ├── card-battle.html
│   ├── culture-app.html
│   ├── foclock.html
│   └── vr-cage.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── placeholder-project.jpg
│   │   ├── avatar-or-logo.png
│   │   └── project-*.svg
│   ├── videos/
│   └── resume/
│       └── resume.pdf
└── README.md
```

## 本地预览

直接双击 `index.html`，或在浏览器中打开该文件即可预览。项目没有使用数据库、后台或构建工具。

也可以使用任意静态服务器预览，例如：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 后续替换内容

- `assets/resume/resume.pdf` 已预留为简历下载文件；如简历更新，直接替换同名 PDF。
- 将 `assets/images/` 中的项目封面和截图替换为真实项目图片。
- 将演示视频放入 `assets/videos/`，并在项目详情页的 `<video>` 占位代码中修改路径。
- 在 `index.html` 中继续更新项目文案、B 站主页链接和个人网站链接。

## 部署建议

该项目是纯静态网站，可以直接部署到 GitHub Pages、Vercel、Netlify 或任意静态托管服务。部署时将整个目录作为站点根目录即可。
