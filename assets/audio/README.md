# 录音放这里

两个文件，文件名固定：

```
assets/audio/sonnet73.mp3         《十四行诗第七十三首》  26 秒
assets/audio/ancient-mariner.mp3  《古舟子咏》            25 秒
```

**文件在，播放器就出现；文件不在，整块自动消失。** 不用改代码。

## 怎么生成的

与书中音频同一路数——神经语音合成，不是人声：

```bash
unset PYTHONHOME PYTHONPATH
.venv/Scripts/python.exe tools/make_audio.py
```

- 男声 `en-GB-ThomasNeural`（英式，比美音更贴「英国文学教授」）
- 语速 `-15%`，按书里那句「如落叶贴着枯草滑行」
- 两段之间插 1.2 秒静音，再统一响度（loudnorm −18 LUFS）、转 128 kbps 单声道

要换声音或语速，改 `tools/make_audio.py` 顶上的 `VOICE` / `RATE` 两行，重跑。

## 录什么

| 文件 | 内容 |
|---|---|
| `sonnet73.mp3` | 十四行诗第七十三首：开头四行（*That time of year thou mayst in me behold…*）＋结尾两行（*This thou perceiv'st, which makes thy love more strong…*） |
| `ancient-mariner.mp3` | 《古舟子咏》：*Water, water, everywhere…* 四行 ＋ *He prayeth best, who loveth best…* 四行 |

## 一条不可越的线

**绝不用 AI 克隆颜毓蘅的声音。** 他的声音没有录音留存，任何「他的声音」都是伪造。

站上写的是「合成语音朗读，不是传主本人的声音」——这行字不要删，也不要把「合成」二字去掉。这是全站唯一可能被误认为他本人声音的地方。
