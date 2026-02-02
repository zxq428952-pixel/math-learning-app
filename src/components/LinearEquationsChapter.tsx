'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Info, FunctionSquare } from 'lucide-react';

export function LinearEquationsChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 dark:border-orange-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FunctionSquare className="h-6 w-6 text-orange-600" />
            二元一次方程组
          </CardTitle>
          <CardDescription>
            学习二元一次方程组的解法、图像法与应用
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="intro" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="intro" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            基础概念
          </TabsTrigger>
          <TabsTrigger value="graph" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            图像解法
          </TabsTrigger>
          <TabsTrigger value="algebra" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            代数解法
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intro">
          <BasicConcepts />
        </TabsContent>

        <TabsContent value="graph">
          <GraphicalSolution />
        </TabsContent>

        <TabsContent value="algebra">
          <AlgebraicSolution />
        </TabsContent>

        <TabsContent value="practice">
          <LinearEquationsPractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 基础概念组件
function BasicConcepts() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">二元一次方程组基础</CardTitle>
        <CardDescription>理解二元一次方程组的概念和标准形式</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h3 className="text-xl font-bold mb-4">什么是二元一次方程组？</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              由两个或两个以上二元一次方程组成的方程组，称为二元一次方程组。
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-center text-lg">
              <div className="mb-2">
                {`{ a₁x + b₁y = c₁`}
              </div>
              <div>
                {`{ a₂x + b₂y = c₂`}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">二元一次方程的特征</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>含有两个未知数（通常是 x 和 y）</li>
                <li>未知数的最高次数是 1</li>
                <li>方程两边都是整式</li>
                <li>图像是一条直线</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">方程组的解</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>满足方程组中所有方程的未知数的值</li>
                <li>在图像上表现为两条直线的交点</li>
                <li>可能是唯一解、无解或无数解</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-orange-600" />
              三种解的情况
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500 mt-0.5">唯一解</Badge>
                <div>
                  <p className="font-medium">两条直线相交</p>
                  <p className="text-gray-600 dark:text-gray-400">a₁/a₂ ≠ b₁/b₂，有一个交点</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-red-500 mt-0.5">无解</Badge>
                <div>
                  <p className="font-medium">两条直线平行</p>
                  <p className="text-gray-600 dark:text-gray-400">a₁/a₂ = b₁/b₂ ≠ c₁/c₂，没有交点</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-500 mt-0.5">无数解</Badge>
                <div>
                  <p className="font-medium">两条直线重合</p>
                  <p className="text-gray-600 dark:text-gray-400">a₁/a₂ = b₁/b₂ = c₁/c₂，有无数个交点</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 图像解法组件
function GraphicalSolution() {
  const [a1, setA1] = useState(1);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(5);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(-1);
  const [c2, setC2] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 计算交点
  const solveIntersection = () => {
    const det = a1 * b2 - a2 * b1;
    if (det === 0) return null;

    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;

    return { x: x.toFixed(2), y: y.toFixed(2) };
  };

  useEffect(() => {
    drawGraph();
  }, [a1, b1, c1, a2, b2, c2]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 25;

    // 绘制网格
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;

    for (let i = -10; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(canvas.width, centerY + i * scale);
      ctx.stroke();
    }

    // 绘制坐标轴
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 绘制第一条直线
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = -10; x <= 10; x += 0.1) {
      const y = (c1 - a1 * x) / b1;
      const px = centerX + x * scale;
      const py = centerY - y * scale;
      if (x === -10) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 绘制第二条直线
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = -10; x <= 10; x += 0.1) {
      const y = (c2 - a2 * x) / b2;
      const px = centerX + x * scale;
      const py = centerY - y * scale;
      if (x === -10) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 绘制交点
    const intersection = solveIntersection();
    if (intersection) {
      const ix = centerX + parseFloat(intersection.x) * scale;
      const iy = centerY - parseFloat(intersection.y) * scale;

      ctx.beginPath();
      ctx.arc(ix, iy, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#22C55E';
      ctx.fill();
      ctx.strokeStyle = '#14532D';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 12px Arial';
      ctx.fillStyle = '#22C55E';
      ctx.textAlign = 'center';
      ctx.fillText(`(${intersection.x}, ${intersection.y})`, ix, iy - 15);
    }
  };

  const intersection = solveIntersection();

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">图像解法</CardTitle>
        <CardDescription>通过绘制两条直线的交点求解</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">方程 1</h4>
              <div className="font-mono text-lg text-center">
                {a1}x + {b1}y = {c1}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                解为 y = {(c1 / b1).toFixed(2)} - {(a1 / b1).toFixed(2)}x
              </div>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-semibold mb-3 text-red-700 dark:text-red-300">方程 2</h4>
              <div className="font-mono text-lg text-center">
                {a2}x + {b2}y = {c2}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                解为 y = {(c2 / b2).toFixed(2)} - {(a2 / b2).toFixed(2)}x
              </div>
            </div>

            {intersection ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  交点（方程组的解）
                </h4>
                <div className="font-mono text-xl text-center text-green-700 dark:text-green-300">
                  ({intersection.x}, {intersection.y})
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-yellow-600" />
                  无交点
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  两条直线平行或重合，没有唯一交点
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500">a₁: {a1}</label>
                <Slider value={[a1]} onValueChange={(v) => setA1(v[0])} min={-5} max={5} step={1} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">b₁: {b1}</label>
                <Slider value={[b1]} onValueChange={(v) => setB1(v[0])} min={-5} max={5} step={1} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">a₂: {a2}</label>
                <Slider value={[a2]} onValueChange={(v) => setA2(v[0])} min={-5} max={5} step={1} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">b₂: {b2}</label>
                <Slider value={[b2]} onValueChange={(v) => setB2(v[0])} min={-5} max={5} step={1} className="w-full" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas ref={canvasRef} width={400} height={350} className="w-full bg-white dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 代数解法组件
function AlgebraicSolution() {
  const [activeMethod, setActiveMethod] = useState<'substitution' | 'elimination'>('substitution');

  const substitutionExample = {
    equations: ['x + y = 5', '2x - y = 1'],
    steps: [
      '从方程 1 得出：y = 5 - x',
      '将 y = 5 - x 代入方程 2：2x - (5 - x) = 1',
      '化简：2x - 5 + x = 1',
      '解得：3x = 6，x = 2',
      '将 x = 2 代入 y = 5 - x，得：y = 3',
      '方程组的解为：x = 2, y = 3'
    ]
  };

  const eliminationExample = {
    equations: ['x + y = 5', '2x - y = 1'],
    steps: [
      '将两个方程相加：(x + y) + (2x - y) = 5 + 1',
      '化简：3x = 6',
      '解得：x = 2',
      '将 x = 2 代入方程 1：2 + y = 5',
      '解得：y = 3',
      '方程组的解为：x = 2, y = 3'
    ]
  };

  const example = activeMethod === 'substitution' ? substitutionExample : eliminationExample;

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">代数解法</CardTitle>
        <CardDescription>代入消元法和加减消元法</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveMethod('substitution')}
              variant={activeMethod === 'substitution' ? 'default' : 'outline'}
              className="flex-1"
            >
              代入消元法
            </Button>
            <Button
              onClick={() => setActiveMethod('elimination')}
              variant={activeMethod === 'elimination' ? 'default' : 'outline'}
              className="flex-1"
            >
              加减消元法
            </Button>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-center">
                <div className="mb-2">
                  {`{ ${example.equations[0]}`}
                </div>
                <div>
                  {`{ ${example.equations[1]}`}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold mb-3">求解步骤：</h4>
                {example.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge className="bg-orange-500 mt-0.5">{index + 1}</Badge>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-3">代入消元法</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>从一个方程中解出一个未知数</li>
                <li>将这个表达式代入另一个方程</li>
                <li>解出一元一次方程</li>
                <li>回代求出另一个未知数</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-3">加减消元法</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>通过方程相加或相减消去一个未知数</li>
                <li>得到一元一次方程</li>
                <li>解出一个未知数</li>
                <li>代入原方程求出另一个未知数</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-2">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">解法选择建议</p>
              <p className="text-gray-600 dark:text-gray-400">
                如果方程组中某个未知数的系数是 1 或 -1，代入消元法更方便；
                如果两个方程中某个未知数的系数相同或相反数，加减消元法更简便。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 练习题组件
function LinearEquationsPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "方程组 {x + y = 5, 2x - y = 1} 的解是？",
      options: ["x = 2, y = 3", "x = 3, y = 2", "x = 1, y = 4", "x = 4, y = 1"],
      correctAnswer: 0,
      explanation: "两式相加得 3x = 6，x = 2。代入 x = 2 得 y = 3。因此解为 x = 2, y = 3。"
    },
    {
      question: "以下哪个是方程组 {2x + 3y = 7, x - y = 1} 的解？",
      options: ["x = 1, y = 2", "x = 2, y = 1", "x = 0, y = 1", "x = 2, y = 0"],
      correctAnswer: 1,
      explanation: "由 x - y = 1 得 x = y + 1，代入 2x + 3y = 7 得 2(y+1) + 3y = 7，5y = 5，y = 1，x = 2。"
    },
    {
      question: "用代入法解方程组 {y = 2x + 1, 3x - y = 2}，第一步应该做什么？",
      options: ["把 y = 2x + 1 代入第二个方程", "把 y = 2x + 1 代入第一个方程", "把 x = (y - 1)/2", "两式相加"],
      correctAnswer: 0,
      explanation: "代入消元法的第一步是将一个方程中已解出的未知数表达式代入另一个方程中消去该未知数。"
    },
    {
      question: "方程组 {x + 2y = 5, 2x + 4y = 10} 的解的情况是？",
      options: ["唯一解", "无解", "无数解", "不确定"],
      correctAnswer: 2,
      explanation: "第二个方程两边同时除以 2 得 x + 2y = 5，与第一个方程相同，因此两条直线重合，有无数解。"
    },
    {
      question: "某商品原价 x 元，降价 20% 后为 y 元，售价为 80 元。则方程组为？",
      options: ["y = 0.8x, y = 80", "y = 0.2x, y = 80", "x = 0.8y, y = 80", "y = x - 20, y = 80"],
      correctAnswer: 0,
      explanation: "降价 20% 即原价的 80%，所以 y = 0.8x。售价为 80 元，所以 y = 80。方程组为 {y = 0.8x, y = 80}。"
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
        <CardTitle className="text-lg">二元一次方程组练习题</CardTitle>
        <CardDescription>巩固方程组的求解方法</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentQuestion < questions.length ? (
            <>
              <div className="flex justify-between items-center">
                <Badge className="bg-orange-500">第 {currentQuestion + 1} / {questions.length} 题</Badge>
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
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
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
