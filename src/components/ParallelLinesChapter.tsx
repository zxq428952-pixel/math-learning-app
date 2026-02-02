'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Info, Minus } from 'lucide-react';

export function ParallelLinesChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-200 dark:border-indigo-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Minus className="h-6 w-6 text-indigo-600" />
            平行线的证明
          </CardTitle>
          <CardDescription>
            学习平行线的判定与性质、角度关系、证明方法
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="basics" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            基础概念
          </TabsTrigger>
          <TabsTrigger value="angles" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            角度关系
          </TabsTrigger>
          <TabsTrigger value="proof" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            判定与性质
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basics">
          <BasicConcepts />
        </TabsContent>

        <TabsContent value="angles">
          <AngleRelationships />
        </TabsContent>

        <TabsContent value="proof">
          <ParallelProofs />
        </TabsContent>

        <TabsContent value="practice">
          <ParallelPractice />
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
        <CardTitle className="text-lg">平行线的基础概念</CardTitle>
        <CardDescription>理解平行线、相交线、垂线的基本定义</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <h3 className="text-xl font-bold mb-4">什么是平行线？</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              在同一平面内，不相交的两条直线叫做平行线。
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-center text-lg">
              如果直线 AB 和直线 CD 平行，记作：AB ∥ CD
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">平行线的特征</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>在同一平面内</li>
                <li>永不相交</li>
                <li>没有公共点</li>
                <li>方向相同或相反</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">唯一性定理</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                过直线外一点，有且只有一条直线与已知直线平行。
              </p>
              <p className="text-xs text-gray-500">
                平行公理
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">传递性</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                如果 a ∥ b，b ∥ c，则 a ∥ c
              </p>
              <p className="text-xs text-gray-500">
                平行线的传递性
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-600" />
              重要概念辨析
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-500 mt-0.5">相交线</Badge>
                <div>
                  <p className="font-medium">在同一平面内有公共点的两条直线</p>
                  <p className="text-gray-600 dark:text-gray-400">形成4个角，其中相邻的角互补</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500 mt-0.5">垂线</Badge>
                <div>
                  <p className="font-medium">夹角为90°的两条相交直线</p>
                  <p className="text-gray-600 dark:text-gray-400">垂线段最短</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-purple-500 mt-0.5">同位角、内错角、同旁内角</Badge>
                <div>
                  <p className="font-medium">两条直线被第三条直线所截形成的特殊角</p>
                  <p className="text-gray-600 dark:text-gray-400">用于判断平行线</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 角度关系组件
function AngleRelationships() {
  const [cutAngle, setCutAngle] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawLines();
  }, [cutAngle]);

  const drawLines = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;
    const centerX = canvas.width / 2;

    // 绘制两条平行线
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(50, centerY - 60);
    ctx.lineTo(canvas.width - 50, centerY - 60);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, centerY + 60);
    ctx.lineTo(canvas.width - 50, centerY + 60);
    ctx.stroke();

    // 标记平行符号
    for (let i = 100; i < canvas.width - 100; i += 80) {
      ctx.beginPath();
      ctx.moveTo(i, centerY - 60);
      ctx.lineTo(i - 10, centerY - 70);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i, centerY + 60);
      ctx.lineTo(i - 10, centerY + 50);
      ctx.stroke();
    }

    // 绘制截线
    const radians = (cutAngle * Math.PI) / 180;
    const lineLength = 400;
    const dx = Math.cos(radians) * lineLength;
    const dy = Math.sin(radians) * lineLength;

    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - dx / 2, centerY + dy / 2);
    ctx.lineTo(centerX + dx / 2, centerY - dy / 2);
    ctx.stroke();

    // 计算交点
    const y1 = centerY - 60;
    const y2 = centerY + 60;
    const slope = Math.tan(radians);
    const x1 = centerX - (centerY + dy / 2 - y1) / slope;
    const x2 = centerX - (centerY + dy / 2 - y2) / slope;

    // 标注角度
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#3B82F6';

    // 同位角
    ctx.fillText('∠1', x1 + 20, y1 - 10);
    ctx.fillText('∠2', x2 + 20, y2 - 10);

    // 内错角
    ctx.fillStyle = '#22C55E';
    ctx.fillText('∠3', x1 + 20, y1 + 25);
    ctx.fillText('∠4', x2 + 20, y2 - 35);

    // 同旁内角
    ctx.fillStyle = '#F59E0B';
    ctx.fillText('∠5', x1 + 20, y1 + 40);
    ctx.fillText('∠6', x2 + 20, y2 - 50);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">角度关系</CardTitle>
        <CardDescription>同位角、内错角、同旁内角的识别</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                截线角度：{cutAngle}°
              </label>
              <input
                type="range"
                min="10"
                max="80"
                value={cutAngle}
                onChange={(e) => setCutAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500">同位角</Badge>
                  <span className="text-sm">∠1 和 ∠2</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  两条平行线被截线所截，位于两条线的同一侧，且在截线的同侧
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">内错角</Badge>
                  <span className="text-sm">∠3 和 ∠4</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  两条平行线被截线所截，位于两条线的内侧，且在截线的两侧
                </p>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-500">同旁内角</Badge>
                  <span className="text-sm">∠5 和 ∠6</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  两条平行线被截线所截，位于两条线的内侧，且在截线的同侧
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas ref={canvasRef} width={400} height={300} className="w-full bg-white dark:bg-gray-800 rounded-lg" />
          </div>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">角度关系的重要性</p>
            <p className="text-gray-600 dark:text-gray-400">
              同位角相等、内错角相等、同旁内角互补是判断两条直线是否平行的依据，
              也是平行线的重要性质。这些关系在几何证明和计算中经常使用。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 平行线判定与性质组件
function ParallelProofs() {
  const [activeTab, setActiveTab] = useState<'determine' | 'property'>('determine');

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">平行线的判定与性质</CardTitle>
        <CardDescription>判定方法和性质定理</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab('determine')}
              variant={activeTab === 'determine' ? 'default' : 'outline'}
              className="flex-1"
            >
              判定方法
            </Button>
            <Button
              onClick={() => setActiveTab('property')}
              variant={activeTab === 'property' ? 'default' : 'outline'}
              className="flex-1"
            >
              性质定理
            </Button>
          </div>

          {activeTab === 'determine' ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-blue-500">判定方法 1</Badge>
                  同位角相等，两直线平行
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                  <div>如果 ∠1 = ∠2（同位角相等）</div>
                  <div className="text-blue-600 font-bold mt-2">则 AB ∥ CD</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-green-500">判定方法 2</Badge>
                  内错角相等，两直线平行
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                  <div>如果 ∠3 = ∠4（内错角相等）</div>
                  <div className="text-green-600 font-bold mt-2">则 AB ∥ CD</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-yellow-500">判定方法 3</Badge>
                  同旁内角互补，两直线平行
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                  <div>如果 ∠5 + ∠6 = 180°（同旁内角互补）</div>
                  <div className="text-yellow-600 font-bold mt-2">则 AB ∥ CD</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-purple-500">判定方法 4</Badge>
                  垂直于同一直线的两直线平行
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                  <div>如果 AB ⊥ l 且 CD ⊥ l</div>
                  <div className="text-purple-600 font-bold mt-2">则 AB ∥ CD</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-blue-500">性质 1</Badge>
                  两直线平行，同位角相等
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                  <div>如果 AB ∥ CD</div>
                  <div className="text-blue-600 font-bold mt-2">则 ∠1 = ∠2（同位角相等）</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-green-500">性质 2</Badge>
                  两直线平行，内错角相等
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                  <div>如果 AB ∥ CD</div>
                  <div className="text-green-600 font-bold mt-2">则 ∠3 = ∠4（内错角相等）</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-yellow-500">性质 3</Badge>
                  两直线平行，同旁内角互补
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                  <div>如果 AB ∥ CD</div>
                  <div className="text-yellow-600 font-bold mt-2">则 ∠5 + ∠6 = 180°（同旁内角互补）</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-purple-500">性质 4</Badge>
                  平行线间的距离相等
                </h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-sm">
                  <div>如果 AB ∥ CD</div>
                  <div className="text-purple-600 font-bold mt-2">则 AB 和 CD 之间的距离处处相等</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">判定与性质的关系</p>
            <p className="text-gray-600 dark:text-gray-400">
              判定方法和性质定理是互逆命题。判定方法用于判断两条直线是否平行，
              性质定理则在已知平行的前提下，推导角度关系。在几何证明中，需要根据已知条件选择合适的方法。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 练习题组件
function ParallelPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "两条平行线被第三条直线所截，若同位角相等，则这两条直线？",
      options: ["平行", "相交", "垂直", "不确定"],
      correctAnswer: 0,
      explanation: "这是平行线的判定方法之一：同位角相等，两直线平行。"
    },
    {
      question: "若 AB ∥ CD，且被直线 l 所截，则内错角的关系是？",
      options: ["相等", "互补", "互余", "不确定"],
      correctAnswer: 0,
      explanation: "根据平行线的性质：两直线平行，内错角相等。"
    },
    {
      question: "同旁内角的度数分别为 70° 和 110°，则这两条直线的位置关系是？",
      options: ["平行", "相交", "垂直", "无法确定"],
      correctAnswer: 0,
      explanation: "因为 70° + 110° = 180°，同旁内角互补，根据判定方法，两直线平行。"
    },
    {
      question: "下列说法正确的是？",
      options: ["同一平面内不相交的两条线段平行", "垂直于同一条直线的两条直线平行", "平行于同一条直线的两条直线垂直", "相交的两条直线垂直"],
      correctAnswer: 1,
      explanation: "垂直于同一条直线的两条直线平行。注意A选项应该是'直线'而不是'线段'。"
    },
    {
      question: "若 ∠1 和 ∠2 是同位角，且 ∠1 = 65°，则 ∠2 的度数是？",
      options: ["65°", "115°", "25°", "无法确定"],
      correctAnswer: 3,
      explanation: "仅知道 ∠1 和 ∠2 是同位角，无法判断两条直线是否平行。只有当两直线平行时，同位角才相等。"
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
        <CardTitle className="text-lg">平行线的证明练习题</CardTitle>
        <CardDescription>巩固平行线的判定与性质</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentQuestion < questions.length ? (
            <>
              <div className="flex justify-between items-center">
                <Badge className="bg-indigo-500">第 {currentQuestion + 1} / {questions.length} 题</Badge>
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
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
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
