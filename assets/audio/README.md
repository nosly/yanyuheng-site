# 朗读 —— 已撤下，留此备用

两个 mp3 已移到：

```
creative/备选/网站音频-十四行诗第七十三首-男声合成-26s.mp3
creative/备选/网站音频-古舟子咏-男声合成-25s.mp3
```

2026-10-24 决定：站点暂不放声音。播放器的代码还留在 `index.html` 里两处，**文件不在，整块自动隐藏**，所以现在页面上什么也看不见，也不需要改代码。

## 想放回去，三步

```bash
D="E:/work/doc/mq/family/颜毓蘅/creative/备选"
cp "$D/网站音频-十四行诗第七十三首-男声合成-26s.mp3" assets/audio/sonnet73.mp3
cp "$D/网站音频-古舟子咏-男声合成-25s.mp3"   assets/audio/ancient-mariner.mp3
git add -A && git commit -m "恢复两段英文朗读" && git push
```

文件名必须是这两个（区分大小写）：

```
assets/audio/sonnet73.mp3
assets/audio/ancient-mariner.mp3
```

## 想重新生成（不用备选里那两个）

```bash
unset PYTHONHOME PYTHONPATH
.venv/Scripts/python.exe tools/make_audio.py
```

- 男声 `en-GB-ThomasNeural`，语速 `-15%`，两段之间 1.2 秒静音，loudnorm 后转 128 kbps 单声道。
- 换声音或语速改 `tools/make_audio.py` 顶上的 `VOICE` / `RATE` 两行。

## 录的是什么

| 文件 | 内容 |
|---|---|
| `sonnet73.mp3` | 十四行诗第七十三首：开头四行（*That time of year thou mayst in me behold…*）＋结尾两行（*This thou perceiv'st, which makes thy love more strong…*） |
| `ancient-mariner.mp3` | 《古舟子咏》：*Water, water, everywhere…* 四行 ＋ *He prayeth best, who loveth best…* 四行 |

## 一条不可越的线

**绝不用 AI 克隆颜毓蘅的声音。** 他的声音没有录音留存，任何「他的声音」都是伪造。

播放器上写的是「合成语音朗读，不是传主本人的声音」——这行字不要删，也不要把「合成」二字去掉。这是全站唯一可能被误认为他本人声音的地方。
