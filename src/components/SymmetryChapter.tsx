'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoveHorizontal, Info, CheckCircle2, XCircle } from 'lucide-react';

export function SymmetryChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MoveHorizontal className="h-6 w-6 text-purple-600" />
            轴对称 - 承上启下
          </CardTitle>
          <CardDescription>等腰三角形、三线合一、最短路径问题</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="isosceles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="isosceles" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">等腰三角形</TabsTrigger>
          <TabsTrigger value="symmetry" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">轴对称图形</TabsTrigger>
          <TabsTrigger value="general" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">将军饮马</TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">练习题</TabsTrigger>
        </TabsList>

        <TabsContent value="isosceles"><IsoscelesTriangleDemo /></TabsContent>
        <TabsContent value="symmetry"><SymmetryDemo /></TabsContent>
        <TabsContent value="general"><GeneralProblemDemo /></TabsContent>
        <TabsContent value="practice"><SymmetryPractice /></TabsContent>
      </Tabs>
    </div>
  );
}

function IsoscelesTriangleDemo() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader><CardTitle className="text-lg">等腰三角形"三线合一"</CardTitle><CardDescription>顶角平分线、底边中线、底边高线重合</CardDescription></CardHeader>
      <CardContent>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-2">
          <div className="font-medium text-purple-900 dark:text-purple-100 mb-3">三线合一性质</div>
          <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-red-500 rounded-full" /><span>顶角平分线</span></div>
          <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-green-500 rounded-full" /><span>底边中线</span></div>
          <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-blue-500 rounded-full" /><span>底边高线</span></div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm"><p className="font-medium mb-2">口诀："看到等腰，就找三线"</p><p className="text-gray-600 dark:text-gray-400">这是等腰三角形解题的万能钥匙。在证明题中，如果遇到等腰三角形，立即想到利用三线合一性质。</p></div>
        </div>
      </CardContent>
    </Card>
  );
}

function SymmetryDemo() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader><CardTitle className="text-lg">轴对称图形</CardTitle><CardDescription>沿对称轴折叠后完全重合的图形</CardDescription></CardHeader>
      <CardContent>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
          <div className="font-medium text-sm">轴对称的性质</div>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>• 对称轴是对称点连线的垂直平分线</li>
            <li>• 对称点到对称轴的距离相等</li>
            <li>• 对称图形的形状和大小相同</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function GeneralProblemDemo() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader><CardTitle className="text-lg">将军饮马模型</CardTitle><CardDescription>口诀："两定一动，作对称，连定点"</CardDescription></CardHeader>
      <CardContent>
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="font-medium text-sm mb-3">问题描述</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">点 A、B 在河流同侧，在河流上找一点 P，使 AP + BP 的距离最短。</p>
        </div>
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="font-medium text-sm mb-3">解题步骤</div>
          <ol className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
            <li>1. 作点 B 关于河流的对称点 B'</li>
            <li>2. 连接 A 和 B'</li>
            <li>3. AB' 与河流的交点即为最优点 P</li>
          </ol>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm"><p className="font-medium mb-2">记忆方法</p><p className="text-gray-600 dark:text-gray-400">想象将军（动点 P）要去河边（对称轴）饮马，然后回军营（点 B），怎样走最短？动手画图演绎这个故事。</p></div>
        </div>
      </CardContent>
    </Card>
  );
}

function SymmetryPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "等腰三角形的两个底角有什么关系？",
      options: ["相等", "互补", "互余", "不确定"],
      correctAnswer: 0,
      explanation: "等腰三角形的两个底角相等，这是等腰三角形的基本性质。"
    },
    {
      question: "等腰三角形中，顶角平分线、底边中线、底边高线这三条线有什么关系？",
      options: ["互相平行", "互相垂直", "三线合一", "互相平分"],
      correctAnswer: 2,
      explanation: "等腰三角形中，顶角平分线、底边中线、底边高线互相重合，这就是'三线合一'性质。"
    },
    {
      question: "等边三角形的每个内角是多少度？",
      options: ["45°", "60°", "90°", "120°"],
      correctAnswer: 1,
      explanation: "等边三角形的三个内角相等，每个角 = 180° ÷ 3 = 60°。"
    },
    {
      question: "点A(2, 3)关于x轴对称的点的坐标是？",
      options: ["(2, -3)", "(-2, 3)", "(-2, -3)", "(3, 2)"],
      correctAnswer: 0,
      explanation: "关于x轴对称，x坐标不变，y坐标取相反数，所以是(2, -3)。"
    },
    {
      question: "在'将军饮马'模型中，最短路径的点是通过什么方法找到的？",
      options: ["直接连接两点", "作对称点后连线", "作垂直线", "作角平分线"],
      correctAnswer: 1,
      explanation: "'将军饮马'模型中，需要作一个定点关于直线的对称点，然后连接对称点与另一个定点，交点即为最短路径点。"
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
        <CardTitle className="text-lg">轴对称练习题</CardTitle>
        <CardDescription>巩固轴对称和等腰三角形知识</CardDescription>
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
