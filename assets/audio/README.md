# 录音放这里

两个文件，文件名必须是这两个（区分大小写）：

```
assets/audio/sonnet73.mp3        《十四行诗第七十三首》
assets/audio/ancient-mariner.mp3 《古舟子咏》
```

**文件在，播放器就出现；文件不在，整块自动消失。** 不用改任何代码——放进去、`git push` 就行。

## 录什么

| 文件 | 内容 | 大约 |
|---|---|---|
| `sonnet73.mp3` | 十四行诗第七十三首：开头四行（*That time of year thou mayst in me behold…*）＋结尾两行（*This thou perceiv'st, which makes thy love more strong…*） | 40 秒 |
| `ancient-mariner.mp3` | 《古舟子咏》：*Water, water, everywhere…* 四行 ＋ *He prayeth best, who loveth best…* 四行 | 50 秒 |

## 怎么录

- **男声**，一个人读，不要配乐。
- 手机在安静的房间里录一遍就够，不用棚。
- 语速按书里那句话：「速度要慢，如落叶贴着枯草滑行。」不是朗诵比赛——慢、平、不使劲，像读给自己听。
- 开头留半秒空白，结尾留一秒，别剪得太紧。
- 一遍录坏就重录，不用修音。

## 放进来之前

- 转成 mp3，128 kbps 单声道就够（别用 320 kbps，白占体积）。
- 一首控制在 1 MB 以内。
- 用 ffmpeg 转的话：

```bash
ffmpeg -i 原始录音.m4a -ac 1 -b:a 128k -af "loudnorm" assets/audio/sonnet73.mp3
```

## 一条不可越的线

**绝不用 AI 克隆颜毓蘅的声音。** 他的声音没有录音留存，任何「他的声音」都是伪造。站上已经写明「由后人请人代读，不是传主本人的声音」——这行字不要删。
