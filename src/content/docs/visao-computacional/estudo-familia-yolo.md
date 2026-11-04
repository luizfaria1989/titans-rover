---
title: Estudo da família YOLO
description: Evolução YOLOv5 → YOLOv8 → YOLO11 e escolha do modelo para o Protótipo 1 (P1) do rover.
---

**Evolução YOLOv5 → YOLOv8 → YOLO11 e escolha do modelo para o P1**

- **Equipe:** Equipe Titans
- **Projeto:** Rover — Protótipo 1 (P1)
- **Responsável:** <mark>[Nome do(a) responsável]</mark>
- **Data:** 3 de novembro de 2026


## 1. Evolução arquitetural


**Tabela 1:** Visão geral das mudanças por versão.

| Versão | Backbone / neck | Head | Loss / atribuição | Pós-proc. |
| --- | --- | --- | --- | --- |
| YOLOv5 (2020) | CSPDarknet com **C3**; stem conv 6 × 6; SPPF; neck PANet | **Acoplada, baseada em anchors** (3/célula), com *objectness* | BCE (obj + cls) + CIoU; atribuição por razão de forma | NMS |
| YOLOv8 (2023) | Blocos **C2f**; stem conv 3 × 3; SPPF; neck PANet com C2f | **Desacoplada, anchor-free**, sem *objectness* | BCE + CIoU + **DFL**; **Task-Aligned Assigner** | NMS |
| YOLO11 (2024) | Blocos **C3k2**; SPPF + **C2PSA** (atenção espacial) | Desacoplada, anchor-free; ramo de classe com convs *depthwise* | Igual ao YOLOv8 | NMS |
| YOLO12 (2025) | C3k2 nos estágios iniciais; **A2C2f** (*Area Attention* + R-ELAN) em P4/P5 e no neck | Igual ao YOLO11 | Igual ao YOLOv8 | NMS |
| YOLO26 (2026) | Igual ao YOLO11 (C3k2, SPPF, C2PSA) | Anchor-free, **sem DFL**; head **one-to-one** (end-to-end) | **ProgLoss** + **STAL**; otimizador MuSGD | **NMS-free** |
| YOLO27 (2026\*) | n/s: CNN simplificada, prediz em **2 escalas** (não 3); m: backbone estilo YOLO26 + **decoder transformer** | n/s: one-to-many + one-to-one opcional; m: **baseada em queries** | Não divulgada; n/s têm ramo de alinhamento de *foreground* só no treino | n/s: NMS‡<br>m: NMS-free |

<small>\* Anunciado em 13/09/2026; ainda sem pesos, sem suporte no pacote `ultralytics` e sem data de lançamento. ‡ NMS por padrão; NMS-free com `nms=False`.</small>

### 1.1 YOLOv5


### 1.2 YOLOv8


### 1.3 YOLO11

### 1.4 YOLO12

### 1.5 YOLO26

### 1.6 YOLO27 (prévia)

### 1.8 Trade-offs entre as variantes nano, small e medium

**Tabela 2:** Variantes n/s/m (COCO val2017, entrada 640 × 640). Latências em ms. Fontes: [[2]](#ref-2), [[5]](#ref-5), [[7]](#ref-7), [[8]](#ref-8), [[15]](#ref-15), [[16]](#ref-16).

| Versão | Modelo | Params (M) | GFLOPs | mAP₅₀₋₉₅ | CPU | GPU | No rover |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **YOLOv5**ᵃ | YOLOv5n | 1,9 | 4,5 | 28,0 | 45 | 6,3 | <mark>[–]</mark> |
| | YOLOv5s | 7,2 | 16,5 | 37,4 | 98 | 6,4 | <mark>[–]</mark> |
| | YOLOv5m | 21,2 | 49,0 | 45,4 | 224 | 8,2 | <mark>[–]</mark> |
| **YOLOv8**ᵇ | YOLOv8n | 3,2 | 8,7 | 37,3 | 80,4 | 0,99 | <mark>[–]</mark> |
| | YOLOv8s | 11,2 | 28,6 | 44,9 | 128,4 | 1,20 | <mark>[–]</mark> |
| | YOLOv8m | 25,9 | 78,9 | 50,2 | 234,7 | 1,83 | <mark>[–]</mark> |
| **YOLO11**ᶜ | YOLO11n | 2,6 | 6,5 | 39,5 | 56,1 | 1,5 | <mark>[–]</mark> |
| | YOLO11s | 9,4 | 21,6 | 47,0 | 90,0 | 2,5 | <mark>[–]</mark> |
| | YOLO11m | 20,1 | 68,1 | 51,5 | 183,2 | 4,7 | <mark>[–]</mark> |
| **YOLO12**ᵈ | YOLO12n | 2,6 | 7,5 | 40,6 | – | 1,64 | <mark>[–]</mark> |
| | YOLO12s | 9,3 | 23,3 | 48,0 | – | 2,61 | <mark>[–]</mark> |
| | YOLO12m | 20,2 | 70,7 | 52,5 | – | 4,86 | <mark>[–]</mark> |
| **YOLO26**ᵉ | YOLO26n | 2,4 | 5,5 | 40,1 | 38,9 | 1,7 | <mark>[–]</mark> |
| | YOLO26s | 9,5 | 20,9 | 47,8 | 87,2 | 2,5 | <mark>[–]</mark> |
| | YOLO26m | 20,4 | 68,4 | 52,5 | 220,0 | 4,7 | <mark>[–]</mark> |
| **YOLO27**ᶠ | YOLO27n | 3,0 | 7,2 | 42,6 | 16,1 | 0,44 | <mark>[–]</mark> |
| | YOLO27s | 11,8 | 28,2 | 50,1 | 33,2 | 0,64 | <mark>[–]</mark> |
| | YOLO27m | 22,8 | 65,0 | 56,1 | 74,8 | 1,01 | <mark>[–]</mark> |

<small>

- ᵃ YOLOv5 v7.0 (anchor-based): CPU PyTorch, GPU NVIDIA V100 (batch 1).
- ᵇ YOLOv8: CPU ONNX, GPU NVIDIA A100 TensorRT.
- ᶜ YOLO11: CPU ONNX, GPU NVIDIA T4 TensorRT 10.
- ᵈ YOLO12: GPU NVIDIA T4 TensorRT FP16; a documentação não publica latência em CPU.
- ᵉ YOLO26: CPU ONNX, GPU NVIDIA T4 TensorRT 10, modo NMS-free; mAP do modo end-to-end (com a head one-to-many + NMS: 40,9 / 48,6 / 53,1); params e FLOPs do modelo fundido.
- ᶠ YOLO27 (**preliminar, não lançado**): CPU ONNX, GPU NVIDIA RTX PRO 6000 TensorRT 11; params e FLOPs do modelo fundido. A Ultralytics diz que o YOLO27n/s tem velocidade praticamente igual à do YOLO26n/s, então a CPU diferente deve explicar a latência bem menor.

As latências de YOLO11, YOLO12 e YOLO26 (T4) são comparáveis entre si; as demais vêm de outras máquinas e só se comparam entre tamanhos da mesma versão. A coluna “No rover” deve ser preenchida com `yolo benchmark` [[19]](#ref-19) executado no hardware real ([Seção 4](#4-recomendação-final-para-o-protótipo-1)).

</small>

![Gráfico de mAP50-95 no COCO versus número de parâmetros (milhões) para YOLOv5, YOLOv8, YOLO11, YOLO12, YOLO26 e YOLO27, com três pontos (n, s, m) por versão.](./imagens/estudo-yolo-figura-1.png)

**Figura 1:** Precisão versus tamanho do modelo. Em cada curva, os três pontos são as variantes n, s e m, da esquerda para a direita. YOLO11, YOLO12 e YOLO26 ficam acima e à esquerda do YOLOv5 e do YOLOv8: mais mAP com menos parâmetros. A curva tracejada do YOLO27 usa dados preliminares de um modelo ainda não lançado.


## 2. Conceitos de métricas e formato do dataset

### 2.1 Métricas aplicadas ao cenário do rover

Uma detecção é **verdadeiro positivo (TP)** quando a classe está correta e a sobreposição com a caixa real ultrapassa um limiar de IoU (*Intersection over Union*):

$$
\text{IoU} = \frac{|B_{\text{pred}} \cap B_{\text{real}}|}{|B_{\text{pred}} \cup B_{\text{real}}|}
$$

Caso contrário, é **falso positivo (FP)**. Um objeto real que não foi detectado é um **falso negativo (FN)**. Classes do rover: <mark>[ex.: obstáculo, rocha, marcador ArUco, ferramenta]</mark>. As definições seguem o guia de métricas da Ultralytics [[20]](#ref-20) e o protocolo do COCO [[18]](#ref-18).

**Tabela 3:** Métricas de detecção. $\text{AP}_c$ é a *Average Precision* da classe $c$ e $N$ é o número de classes.

| Métrica | Definição | Interpretação no rover |
| --- | :---: | --- |
| Precision | $\dfrac{TP}{TP + FP}$ | Das detecções que o rover fez, quantas eram reais. Precision baixa gera *alarmes falsos*: o rover desvia ou para por obstáculos que não existem e perde tempo de missão. |
| Recall | $\dfrac{TP}{TP + FN}$ | Dos objetos que estavam na cena, quantos o rover encontrou. Recall baixo significa *obstáculo não visto* (risco de colisão) ou alvo da missão perdido. Para segurança, é a métrica mais crítica. |
| mAP₅₀ | $\dfrac{1}{N}\sum_{c=1}^{N} AP_c^{\,\text{IoU}=0{,}5}$ | Média, entre as classes, da área sob a curva Precision×Recall com IoU ≥ 0,5. Mede se o rover *encontra e identifica* os objetos, aceitando caixas aproximadas. Basta para decisões do tipo “há um obstáculo à frente”. |
| mAP₅₀₋₉₅ | $\dfrac{1}{10}\sum_{t\in\{0{,}50,\dots,0{,}95\}} \text{mAP}_t$ | Média do mAP em 10 limiares de IoU (de 0,50 a 0,95, passo 0,05). Premia caixas *bem ajustadas*. Importa quando a posição exata da caixa alimenta outra etapa, como estimar a distância de um objeto, alinhar o rover a um alvo ou agarrar com o braço. |

**Observação prática:** o limiar de confiança (`conf`) usado na inferência move o ponto de operação. Um `conf` baixo aumenta o recall e reduz a precision; um `conf` alto faz o contrário. Para o rover, sugere-se escolher o `conf` pela curva P–R de validação, priorizando recall nas classes de obstáculo. Meta do P1: mAP₅₀ ≥ <mark>[definir]</mark> e recall (obstáculos) ≥ <mark>[definir]</mark>.


## 3. Tabela comparativa


## Referências

1. <span id="ref-1"></span>J. Redmon, S. Divvala, R. Girshick e A. Farhadi, “You Only Look Once: Unified, Real-Time Object Detection,” em *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, 2016, pp. 779–788.
2. <span id="ref-2"></span>G. Jocher, *YOLOv5 by Ultralytics*, 2020. doi: [10.5281/zenodo.3908559](https://doi.org/10.5281/zenodo.3908559). Acesso em 2 de nov. de 2026. Endereço: <https://github.com/ultralytics/yolov5>.
3. <span id="ref-3"></span>G. Jocher, J. Qiu e A. Chaurasia, *Ultralytics YOLO*, versão 8.0.0, 2023. Acesso em 2 de nov. de 2026. Endereço: <https://github.com/ultralytics/ultralytics>.
4. <span id="ref-4"></span>G. Jocher e J. Qiu, *Ultralytics YOLO11*, versão 11.0.0, 2024. Acesso em 2 de nov. de 2026. Endereço: <https://github.com/ultralytics/ultralytics>.
5. <span id="ref-5"></span>Ultralytics. “Ultralytics YOLO26,” *Ultralytics Docs*, acesso em 3 de nov. de 2026. Endereço: <https://docs.ultralytics.com/models/yolo26/>.
6. <span id="ref-6"></span>Y. Tian, Q. Ye e D. Doermann, *YOLOv12: Attention-Centric Real-Time Object Detectors*, 2025. arXiv: [2502.12524](https://arxiv.org/abs/2502.12524) [cs.CV].
7. <span id="ref-7"></span>Ultralytics. “YOLO12: Attention-Centric Object Detection,” *Ultralytics Docs*, acesso em 3 de nov. de 2026. Endereço: <https://docs.ultralytics.com/models/yolo12/>.
8. <span id="ref-8"></span>Ultralytics. “Ultralytics YOLO27,” *Ultralytics Docs*, acesso em 3 de nov. de 2026. Endereço: <https://docs.ultralytics.com/models/yolo27/>.
9. <span id="ref-9"></span>Ultralytics. “Key Highlights from Ultralytics YOLO Vision 2026,” *Ultralytics Blog*, acesso em 3 de nov. de 2026. Endereço: <https://www.ultralytics.com/blog/key-highlights-from-ultralytics-yolo-vision-2026>.
10. <span id="ref-10"></span>C.-Y. Wang, H.-Y. M. Liao, Y.-H. Wu, P.-Y. Chen, J.-W. Hsieh e I.-H. Yeh, “CSPNet: A New Backbone that can Enhance Learning Capability of CNN,” em *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW)*, 2020, pp. 390–391.
11. <span id="ref-11"></span>S. Liu, L. Qi, H. Qin, J. Shi e J. Jia, “Path Aggregation Network for Instance Segmentation,” em *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, 2018, pp. 8759–8768.
12. <span id="ref-12"></span>Z. Zheng, P. Wang, W. Liu, J. Li, R. Ye e D. Ren, “Distance-IoU Loss: Faster and Better Learning for Bounding Box Regression,” em *Proceedings of the AAAI Conference on Artificial Intelligence*, vol. 34, 2020, pp. 12 993–13 000.
13. <span id="ref-13"></span>X. Li et al., “Generalized Focal Loss: Learning Qualified and Distributed Bounding Boxes for Dense Object Detection,” em *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 33, 2020.
14. <span id="ref-14"></span>C. Feng, Y. Zhong, Y. Gao, M. R. Scott e W. Huang, “TOOD: Task-aligned One-stage Object Detection,” em *Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)*, 2021, pp. 3490–3499.
15. <span id="ref-15"></span>Ultralytics. “YOLOv8,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/models/yolov8/>.
16. <span id="ref-16"></span>Ultralytics. “YOLO11,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/models/yolo11/>.
17. <span id="ref-17"></span>Z. Tian, C. Shen, H. Chen e T. He, “FCOS: Fully Convolutional One-Stage Object Detection,” em *Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)*, 2019, pp. 9627–9636.
18. <span id="ref-18"></span>T.-Y. Lin et al., “Microsoft COCO: Common Objects in Context,” em *European Conference on Computer Vision (ECCV)*, 2014, pp. 740–755.
19. <span id="ref-19"></span>Ultralytics. “Model Benchmarking with Ultralytics YOLO,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/modes/benchmark/>.
20. <span id="ref-20"></span>Ultralytics. “Performance Metrics Deep Dive,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/guides/yolo-performance-metrics/>.
21. <span id="ref-21"></span>Ultralytics. “Object Detection Datasets Overview,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/datasets/detect/>.
22. <span id="ref-22"></span>Ultralytics. “Quick Start Guide: NVIDIA Jetson with Ultralytics YOLO,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/guides/nvidia-jetson/>.
23. <span id="ref-23"></span>Ultralytics. “Quick Start Guide: Raspberry Pi with Ultralytics YOLO,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/guides/raspberry-pi/>.
24. <span id="ref-24"></span>Ultralytics. “Model Export with Ultralytics YOLO,” *Ultralytics Docs*, acesso em 2 de nov. de 2026. Endereço: <https://docs.ultralytics.com/modes/export/>.

## Histórico de versões

| Versão | Descrição | Data da edição | Editor |
| --- | --- | --- | --- |
| 1.0 | Versão inicial do estudo, com tabelas comparativas. | 04/11/2026 | Luiz |
