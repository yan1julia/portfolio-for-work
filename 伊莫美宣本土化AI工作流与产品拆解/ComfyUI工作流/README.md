### ComfyUI三市场工作流

[导入JSON](./aniimo_xiuxiuta_qwen2511_3markets_HQ.json) · [完整工作流截图](./三市场工作流.png)

一份工作流包含日本、美国、沙特三个分支。共享参考图经过裁切和画布扩展后，进入Qwen图像编辑，再做放大、缩放和候选保存。三个分支分别保留市场提示词、种子和输出目录；Qwen子图定义已包含在JSON内。

#### 导入与输入

1. 在支持子图及Qwen图像编辑节点的ComfyUI中打开JSON。
2. 在“角色原型参考图”节点选择自己的合规参考图片。原输入文件名为 `xiuxiuta_subject_reference.png`，图片本体未随仓库提供。
3. 检查裁切与扩图尺寸；原流程按584像素宽的参考截图配置，更换素材后需重新核对。
4. 配齐下表模型，选择要执行的市场分支。显存不足时分市场运行，避免同时执行三个分支。
5. 候选保存到 `aniimo_localization/qwen2511/` 下的市场子目录，之后进行角色一致性、文化及品牌审核。

#### 模型文件

| 文件名 | ComfyUI模型目录 |
| --- | --- |
| `qwen_image_edit_2511_fp8mixed.safetensors` | `models/diffusion_models` |
| `qwen_2.5_vl_7b_fp8_scaled.safetensors` | `models/text_encoders` |
| `qwen_image_vae.safetensors` | `models/vae` |
| `4x-ESRGAN.pth` | `models/upscale_models` |

[ComfyUI官方Qwen教程](https://docs.comfy.org/tutorials/image/qwen/qwen-image-edit-2511) · [Qwen模型说明](https://huggingface.co/Qwen/Qwen-Image-Edit-2511)

模型权重不包含在本仓库。提示词中的特征约束需要人工检查，不等于角色一致性已获得保证。此文件是生成执行层，并未接通原型中的任务审批、审核记录或规则库。
