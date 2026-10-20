---
title: 'Building a robot that plugs in cables'
description: 'How I built AutoCable, and what I learned about ROS 2 along the way.'
date: 2026-10-19
tags: ['robotics', 'ros2', 'python']
draft: true
---

The first paragraph is the hook. Keep it short and say what the post is about —
this is what people read before deciding whether to keep going.

## Background

Use `##` for section headings. Paragraphs are separated by a blank line.
A single line break in the file does **not** create a line break on the page.

You can **bold** things, *italicize* them, and `inline code` like `ros2 launch`.
Links look like [this](https://github.com/CheickAmadou/AutoCable).

## The hard part

Code blocks get syntax highlighting — put the language after the backticks:

```python
class VelocityController(Node):
    def __init__(self):
        super().__init__("velocity_controller")
        self.create_timer(1 / 50, self.tick)  # 50 Hz

    def tick(self):
        self.publish(self.pid.update(self.target, self.measured))
```

```bash
ros2 launch autocable teleop.launch.py
```

Lists work too:

- Jetson Orin Nano runs the ROS 2 nodes
- Arduino Mega 2560 handles the motor PID loop
- A serial bridge connects them at 115200 baud

Numbered steps:

1. Flash the Arduino
2. Start the ROS 2 stack
3. Open the browser control room

> Blockquotes are good for pulling out a key takeaway or quoting a source.

### Sub-sections

Use `###` for smaller headings inside a section.

## Images

Drop an image in `public/images/` and reference it with an absolute path:

![Alt text describing the image](/images/autocable-chassis.jpg)

## Wrapping up

End with what you learned or what's next. One or two paragraphs is plenty.
