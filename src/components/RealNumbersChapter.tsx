'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, Info, Infinity, CheckCircle2, XCircle } from 'lucide-react';

export function RealNumbersChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Infinity className="h-6 w-6 text-purple-600" />
            实数
          </CardTitle>
          <CardDescription>
            探索有理数、无理数、平方根、立方根等实数概念
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="rational" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="rational" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            有理数与无理数
          </TabsTrigger>
          <TabsTrigger value="root" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            平方根与立方根
          </TabsTrigger>
          <TabsTrigger value="approximate" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            实数近似
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rational">
          <RationalIrrational />
        </TabsContent>

        <TabsContent value="root">
          <RootCalculator />
        </TabsContent>

        <TabsContent value="approximate">
          <ApproximateCalculator />
        </TabsContent>

        <TabsContent value="practice">
          <RealNumbersPractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 有理数与无理数组件
function RationalIrrational() {
  const examples = [
    { type: '有理数', value: '1/2', decimal: '0.5', description: '分数形式' },
    { type: '有理数', value: '0.333...', decimal: '0.3̅', description: '循环小数' },
    { type: '有理数', value: '-7', decimal: '-7.0', description: '整数' },
    { type: '有理数', value: '0', decimal: '0.0', description: '零' },
    { type: '无理数', value: '√2', decimal: '1.41421356...', description: '非循环不重复' },
    { type: '无理数', value: 'π', decimal: '3.14159265...', description: '圆周率' },
    { type: '无理数', value: 'e', decimal: '2.71828182...', description: '自然对数的底' },
    { type: '无理数', value: '√3', decimal: '1.73205080...', description: '根号3' },
  ];

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">有理数与无理数</CardTitle>
        <CardDescription>理解实数的分类和特征</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {examples.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  item.type === '有理数'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                    : 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                }`}
              >
                <Badge className={item.type === '有理数' ? 'bg-blue-500 mb-2' : 'bg-purple-500 mb-2'}>
                  {item.type}
                </Badge>
                <div className="font-mono text-xl font-bold mb-2">{item.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  小数形式：{item.decimal}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-purple-600" />
              有理数与无理数的区别
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-blue-600">有理数 (Rational Numbers)</p>
                <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                  <li>可以表示为两个整数之比（分数形式）p/q，其中 q ≠ 0</li>
                  <li>小数形式是有限小数或无限循环小数</li>
                  <li>包括：整数、分数、有限小数、循环小数</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-purple-600">无理数 (Irrational Numbers)</p>
                <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                  <li>不能表示为两个整数之比</li>
                  <li>小数形式是无限不循环小数</li>
                  <li>常见例子：π, e, √2, √3, √5 等</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 平方根与立方根计算器
function RootCalculator() {
  const [value, setValue] = useState(4);
  const [isSquareRoot, setIsSquareRoot] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const result = isSquareRoot ? Math.sqrt(value).toFixed(6) : Math.cbrt(value).toFixed(6);

  useEffect(() => {
    drawVisualization();
  }, [value, isSquareRoot]);

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 50;

    if (isSquareRoot) {
      // 绘制正方形表示平方
      const size = Math.sqrt(value) * scale;
      const x = centerX - size / 2;
      const y = centerY - size / 2;

      ctx.beginPath();
      ctx.rect(x, y, size, size);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.fill();
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 标注边长
      ctx.font = '14px Arial';
      ctx.fillStyle = '#8B5CF6';
      ctx.textAlign = 'center';
      ctx.fillText(`边长 = √${value} ≈ ${result}`, centerX, centerY + size / 2 + 30);

      ctx.font = '16px Arial';
      ctx.fillText(`面积 = ${value}`, centerX, centerY);
    } else {
      // 绘制立方体示意
      const size = Math.cbrt(value) * scale;
      const x = centerX - size / 2;
      const y = centerY - size / 2;

      // 正面
      ctx.beginPath();
      ctx.rect(x, y, size, size);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.fill();
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 侧面
      ctx.beginPath();
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size + size / 3, y - size / 3);
      ctx.lineTo(x + size + size / 3, y + size - size / 3);
      ctx.lineTo(x + size, y + size);
      ctx.closePath();
      ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.fill();
      ctx.stroke();

      // 顶面
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size / 3, y - size / 3);
      ctx.lineTo(x + size + size / 3, y - size / 3);
      ctx.lineTo(x + size, y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(139, 92, 246, 0.25)';
      ctx.fill();
      ctx.stroke();

      // 标注
      ctx.font = '14px Arial';
      ctx.fillStyle = '#8B5CF6';
      ctx.textAlign = 'center';
      ctx.fillText(`边长 = ³√${value} ≈ ${result}`, centerX, centerY + size / 2 + 30);

      ctx.font = '16px Arial';
      ctx.fillText(`体积 = ${value}`, centerX, centerY);
    }
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">平方根与立方根计算器</CardTitle>
        <CardDescription>探索数的开方运算</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsSquareRoot(true)}
                variant={isSquareRoot ? 'default' : 'outline'}
                className="flex-1"
              >
                平方根
              </Button>
              <Button
                onClick={() => setIsSquareRoot(false)}
                variant={!isSquareRoot ? 'default' : 'outline'}
                className="flex-1"
              >
                立方根
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                {isSquareRoot ? '计算平方根' : '计算立方根'}：{isSquareRoot ? '√' : '³√'}
              </label>
              <Slider
                value={[value]}
                onValueChange={(v) => setValue(v[0])}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-5 w-5 text-purple-600" />
                <span className="font-medium">计算结果</span>
              </div>
              <div className="font-mono text-lg space-y-2">
                <div>
                  {isSquareRoot ? `√${value}` : `³√${value}`} = {result}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isSquareRoot
                    ? `因为 ${result}² ≈ ${value}`
                    : `因为 (${result})³ ≈ ${value}`
                  }
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm space-y-2">
              <p className="font-medium">常用根数记忆：</p>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div>√4 = 2</div>
                <div>√9 = 3</div>
                <div>√16 = 4</div>
                <div>√25 = 5</div>
                <div>√36 = 6</div>
                <div>√49 = 7</div>
                <div>√64 = 8</div>
                <div>√81 = 9</div>
                <div>√100 = 10</div>
                <div>√121 = 11</div>
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
      </CardContent>
    </Card>
  );
}

// 实数近似计算器
function ApproximateCalculator() {
  const [number, setNumber] = useState('2');
  const [precision, setPrecision] = useState(5);

  const handleCalculate = () => {
    const num = parseFloat(number);
    if (isNaN(num)) return 0;
    return Math.sqrt(num).toFixed(precision);
  };

  const approximation = handleCalculate();

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">实数近似计算</CardTitle>
        <CardDescription>计算实数的近似值</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">输入数值</label>
                <Input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="输入一个正数"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  小数位数：{precision}
                </label>
                <Slider
                  value={[precision]}
                  onValueChange={(v) => setPrecision(v[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="font-medium mb-3">计算结果</div>
                <div className="font-mono text-lg">
                  √{number} ≈ {approximation}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  保留 {precision} 位小数
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium mb-3">常用无理数近似值</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div>π ≈ 3.1415926535...</div>
                  <div>e ≈ 2.7182818284...</div>
                  <div>√2 ≈ 1.4142135623...</div>
                  <div>√3 ≈ 1.7320508075...</div>
                  <div>√5 ≈ 2.2360679775...</div>
                  <div>√10 ≈ 3.1622776601...</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-medium mb-3">实数的分类</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500">无理数</Badge>
                    <span>无限不循环小数</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">有理数</Badge>
                    <span>有限小数或循环小数</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start gap-2">
            <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">实数的性质</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>实数可以进行加、减、乘、除、乘方、开方等运算</li>
                <li>实数与数轴上的点一一对应</li>
                <li>实数可以比较大小</li>
                <li>实数满足加法和乘法的交换律、结合律、分配律</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 练习题组件
function RealNumbersPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "以下哪个数是无理数？",
      options: ["0.5", "√9", "√2", "1/3"],
      correctAnswer: 2,
      explanation: "√2 是无限不循环小数，因此是无理数。√9 = 3 是有理数，0.5 和 1/3 也都是有理数。"
    },
    {
      question: "√16 的值是？",
      options: ["±4", "4", "-4", "8"],
      correctAnswer: 1,
      explanation: "√16 表示 16 的算术平方根，结果为正数，即 4。"
    },
    {
      question: "π 是什么类型的数？",
      options: ["有理数", "整数", "无理数", "自然数"],
      correctAnswer: 2,
      explanation: "π 是一个无限不循环小数（约 3.14159...），因此是无理数。"
    },
    {
      question: "³√(-8) 的值是？",
      options: ["2", "-2", "±2", "无解"],
      correctAnswer: 1,
      explanation: "因为 (-2)³ = -8，所以 ³√(-8) = -2。立方根可以是负数。"
    },
    {
      question: "以下哪个数的算术平方根是 7？",
      options: ["14", "49", "√49", "3.5"],
      correctAnswer: 1,
      explanation: "因为 7² = 49，所以 49 的算术平方根是 7。"
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
        <CardTitle className="text-lg">实数练习题</CardTitle>
        <CardDescription>巩固对实数的理解和应用</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentQuestion < questions.length ? (
            <>
              <div className="flex justify-between items-center">
                <Badge className="bg-purple-500">第 {currentQuestion + 1} / {questions.length} 题</Badge>
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
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
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
