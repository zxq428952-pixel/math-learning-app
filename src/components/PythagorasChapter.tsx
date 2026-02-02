'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Square, Info, Triangle as TriangleIcon, CheckCircle2, XCircle, Calculator } from 'lucide-react';

export function PythagorasChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Square className="h-6 w-6 text-blue-600" />
            勾股定理
          </CardTitle>
          <CardDescription>
            探索直角三角形三边关系、勾股定理的证明与应用
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="theorem" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="theorem" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            定理演示
          </TabsTrigger>
          <TabsTrigger value="proof" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            定理证明
          </TabsTrigger>
          <TabsTrigger value="application" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            实际应用
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theorem">
          <TheoremDemo />
        </TabsContent>

        <TabsContent value="proof">
          <TheoremProof />
        </TabsContent>

        <TabsContent value="application">
          <TheoremApplication />
        </TabsContent>

        <TabsContent value="practice">
          <PythagorasPractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 定理演示组件
function TheoremDemo() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const c = Math.sqrt(a * a + b * b).toFixed(2);

  useEffect(() => {
    drawTriangle();
  }, [a, b]);

  const drawTriangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = 40;
    const offsetX = 50;
    const offsetY = canvas.height - 50;

    // 绘制三角形
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + b * scale, offsetY);
    ctx.lineTo(offsetX + b * scale, offsetY - a * scale);
    ctx.closePath();

    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fill();

    // 绘制直角标记
    const angleSize = 20;
    ctx.beginPath();
    ctx.moveTo(offsetX + b * scale - angleSize, offsetY);
    ctx.lineTo(offsetX + b * scale - angleSize, offsetY - angleSize);
    ctx.lineTo(offsetX + b * scale, offsetY - angleSize);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制边长标注
    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(`a = ${a}`, offsetX + b * scale / 2, offsetY + 25);
    ctx.fillText(`b = ${b}`, offsetX + b * scale + 30, offsetY - a * scale / 2);
    ctx.fillText(`c = ${c}`, offsetX + b * scale / 2 + 20, offsetY - a * scale / 2 - 10);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">勾股定理演示</CardTitle>
        <CardDescription>
          直角三角形三边关系：a² + b² = c²
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                直角边 a: {a}
              </label>
              <Slider
                value={[a]}
                onValueChange={(value) => setA(value[0])}
                min={1}
                max={10}
                step={0.5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                直角边 b: {b}
              </label>
              <Slider
                value={[b]}
                onValueChange={(value) => setB(value[0])}
                min={1}
                max={10}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span className="font-medium">计算结果</span>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div>a² = {a}² = {(a * a).toFixed(2)}</div>
                <div>b² = {b}² = {(b * b).toFixed(2)}</div>
                <div className="border-t pt-2 font-bold text-blue-600">
                  a² + b² = {(a * a + b * b).toFixed(2)}
                </div>
                <div className="font-bold text-green-600">
                  c² = {parseFloat(c) * parseFloat(c).toFixed(2)} = {(parseFloat(c) * parseFloat(c)).toFixed(2)}
                </div>
                <div className="border-t pt-2 text-lg font-bold text-purple-600">
                  c = √{(a * a + b * b).toFixed(2)} = {c}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={350}
              className="w-full bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">勾股定理</p>
            <p className="text-gray-600 dark:text-gray-400">
              在直角三角形中，两条直角边的平方和等于斜边的平方。即：a² + b² = c²，
              其中 c 为斜边，a、b 为直角边。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 定理证明组件
function TheoremProof() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">勾股定理的证明</CardTitle>
        <CardDescription>
          勾股定理有500多种证明方法，这里介绍几种经典证明
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <TriangleIcon className="h-5 w-5 text-blue-600" />
              方法一：面积法（毕达哥拉斯证明）
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                作一个边长为 (a + b) 的大正方形，在其中放入四个全等的直角三角形，
                中间会形成一个边长为 c 的小正方形。
              </p>
              <p className="font-mono bg-white dark:bg-gray-800 p-3 rounded-lg">
                大正方形面积 = (a + b)² = a² + 2ab + b²
                <br />
                4个三角形面积 = 4 × (1/2)ab = 2ab
                <br />
                小正方形面积 = c²
                <br />
                <br />
                (a + b)² = 4 × (1/2)ab + c²
                <br />
                a² + 2ab + b² = 2ab + c²
                <br />
                <span className="font-bold text-blue-600">a² + b² = c²</span>
              </p>
            </div>
          </div>

          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">方法二：赵爽弦图（中国古代证明）</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                中国古代数学家赵爽在《周髀算经》中给出的证明方法，用弦图来证明勾股定理。
              </p>
              <p>
                将4个全等的直角三角形围成一个大正方形，中间留下一个小正方形。
                通过面积关系可以证明 a² + b² = c²。
              </p>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-center font-medium">
                  大正方形面积 = 4个三角形面积 + 小正方形面积
                </p>
                <p className="text-center font-mono mt-2 text-green-600">
                  c² = 4 × (1/2)ab + (a - b)²
                </p>
                <p className="text-center font-mono mt-2 text-green-600">
                  c² = 2ab + a² - 2ab + b² = a² + b²
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">方法三：美国总统加菲尔德证明</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                美国第20任总统加菲尔德给出了一种梯形面积证明法。
              </p>
              <p className="font-mono bg-white dark:bg-gray-800 p-3 rounded-lg">
                作一个梯形，上底为 a，下底为 b，高为 (a + b)
                <br />
                <br />
                梯形面积 = (a + b) × (a + b) / 2 = (a + b)² / 2
                <br />
                3个直角三角形面积 = (1/2)ab + (1/2)ab + (1/2)c²
                <br />
                <br />
                (a + b)² / 2 = ab + c² / 2
                <br />
                (a² + 2ab + b²) / 2 = ab + c² / 2
                <br />
                <span className="font-bold text-purple-600">a² + b² = c²</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 实际应用组件
function TheoremApplication() {
  const [ladderHeight, setLadderHeight] = useState(5);
  const [ladderBase, setLadderBase] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reachHeight = Math.sqrt(ladderHeight * ladderHeight - ladderBase * ladderBase).toFixed(2);

  useEffect(() => {
    drawLadder();
  }, [ladderHeight, ladderBase]);

  const drawLadder = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = 30;
    const offsetX = 50;
    const offsetY = canvas.height - 50;

    // 绘制墙壁
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX, offsetY - 300);
    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 绘制地面
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(400, offsetY);
    ctx.stroke();

    // 绘制梯子
    const reachY = offsetY - Math.sqrt(ladderHeight * ladderHeight - ladderBase * ladderBase) * scale;
    ctx.beginPath();
    ctx.moveTo(offsetX, reachY);
    ctx.lineTo(offsetX + ladderBase * scale, offsetY);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 标注
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(`梯子长度: ${ladderHeight}m`, offsetX + ladderBase * scale / 2, offsetY + 25);
    ctx.fillText(`底部距离: ${ladderBase}m`, offsetX + ladderBase * scale + 40, offsetY - reachHeight / 2);
    ctx.fillText(`到达高度: ${reachHeight}m`, offsetX - 40, reachY - 10);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">实际应用：梯子问题</CardTitle>
        <CardDescription>
          计算梯子靠墙时能够到达的高度
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                梯子长度（斜边）: {ladderHeight} 米
              </label>
              <Slider
                value={[ladderHeight]}
                onValueChange={(value) => setLadderHeight(value[0])}
                min={3}
                max={10}
                step={0.5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                底部距离墙角（直角边）: {ladderBase} 米
              </label>
              <Slider
                value={[ladderBase]}
                onValueChange={(value) => setLadderBase(value[0])}
                min={0.5}
                max={ladderHeight - 0.5}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium mb-2">计算</div>
              <div className="font-mono text-sm space-y-2">
                <div>已知：c = {ladderHeight}，a = {ladderBase}</div>
                <div>求：梯子到达的高度 b = ?</div>
                <div className="pt-2 border-t">
                  b = √(c² - a²)
                </div>
                <div className="pt-2">
                  b = √({ladderHeight}² - {ladderBase}²)
                </div>
                <div className="pt-2">
                  b = √({(ladderHeight * ladderHeight).toFixed(2)} - {(ladderBase * ladderBase).toFixed(2)})
                </div>
                <div className="pt-2">
                  b = √{(ladderHeight * ladderHeight - ladderBase * ladderBase).toFixed(2)}
                </div>
                <div className="pt-2 font-bold text-blue-600 text-lg">
                  b = {reachHeight} 米
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={350}
              className="w-full bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">应用场景</p>
            <p className="text-gray-600 dark:text-gray-400">
              勾股定理在实际生活中有很多应用，如：
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
              <li>计算建筑物的对角线长度</li>
              <li>确定两点之间的最短距离</li>
              <li>计算电视屏幕的对角线尺寸</li>
              <li>航海和航空中的距离计算</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 练习题组件
function PythagorasPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "在直角三角形中，两直角边长分别为 3 和 4，则斜边的长度是？",
      options: ["5", "6", "7", "√7"],
      correctAnswer: 0,
      explanation: "根据勾股定理：c² = a² + b² = 3² + 4² = 9 + 16 = 25，所以 c = √25 = 5。"
    },
    {
      question: "一个直角三角形的斜边长为 13，一条直角边为 5，则另一条直角边的长度是？",
      options: ["8", "10", "12", "√144"],
      correctAnswer: 0,
      explanation: "根据勾股定理：a² = c² - b² = 13² - 5² = 169 - 25 = 144，所以 a = √144 = 12。注意题目求另一条直角边，所以答案是 12。"
    },
    {
      question: "以下各组数中，能构成直角三角形三边的是？",
      options: ["2, 3, 4", "6, 8, 10", "1, 2, 3", "4, 5, 6"],
      correctAnswer: 1,
      explanation: "检查每组数是否满足勾股定理：6² + 8² = 36 + 64 = 100 = 10²，所以 6, 8, 10 能构成直角三角形。"
    },
    {
      question: "已知直角三角形的斜边和一条直角边长分别为 10 和 8，则另一条直角边长为？",
      options: ["6", "√36", "2√9", "以上都对"],
      correctAnswer: 3,
      explanation: "根据勾股定理：a² = c² - b² = 10² - 8² = 100 - 64 = 36，所以 a = √36 = 6 = 2√9，以上答案都是正确的。"
    },
    {
      question: "勾股定理的逆命题是？",
      options: ["直角三角形两直角边的平方和等于斜边的平方", "若三角形三边满足 a² + b² = c²，则该三角形是直角三角形", "三角形三边的关系", "以上都不是"],
      correctAnswer: 1,
      explanation: "勾股定理的逆命题是：如果三角形的三边满足 a² + b² = c²，那么这个三角形是直角三角形，c 为斜边。"
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(String(index));
    setShowResult(true);
    if (index === currentQ.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetPractice = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">勾股定理练习题</CardTitle>
        <CardDescription>巩固勾股定理的理解和应用</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentQuestion < questions.length ? (
            <>
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-500">第 {currentQuestion + 1} / {questions.length} 题</Badge>
                <Badge className="bg-green-500">正确率: {correctCount}/{currentQuestion + (showResult ? 1 : 0)}</Badge>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => !showResult && handleAnswer(index)}
                      variant={selectedAnswer === String(index) ? (index === currentQ.correctAnswer ? "default" : "destructive") : showResult && index === currentQ.correctAnswer ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto py-3 px-4 ${selectedAnswer === String(index) ? (index === currentQ.correctAnswer ? "bg-green-500" : "bg-red-500") : showResult && index === currentQ.correctAnswer ? "bg-green-500" : ""}`}
                      disabled={showResult}
                    >
                      <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className={`p-4 rounded-lg ${selectedAnswer === String(currentQ.correctAnswer) ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === String(currentQ.correctAnswer) ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
                    <span className="font-medium">{selectedAnswer === String(currentQ.correctAnswer) ? "回答正确！" : "回答错误"}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">解析：{currentQ.explanation}</p>
                </div>
              )}

              {showResult && currentQuestion < questions.length - 1 && <Button onClick={nextQuestion} className="w-full">下一题</Button>}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">练习完成！</h3>
              <p className="text-lg mb-6">你答对了 <span className="text-green-600 font-bold">{correctCount}</span> / {questions.length} 题</p>
              <Button onClick={resetPractice} size="lg">重新练习</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
