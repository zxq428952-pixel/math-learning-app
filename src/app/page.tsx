'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Triangle, 
  Scale, 
  MoveHorizontal, 
  FunctionSquare, 
  Divide, 
  BookOpen,
  TrendingUp,
  Brain
} from 'lucide-react';
import { TriangleChapter } from '@/components/TriangleChapter';
import { CongruentChapter } from '@/components/CongruentChapter';
import { SymmetryChapter } from '@/components/SymmetryChapter';
import { FunctionChapter } from '@/components/FunctionChapter';
import { AlgebraChapter } from '@/components/AlgebraChapter';
import { StrategyChapter } from '@/components/StrategyChapter';

export default function MathLearningApp() {
  const [activeTab, setActiveTab] = useState('map');

  // 广东省北师大版八年级数学上册章节
  const chapters = [
    { id: 'pythagoras', name: '勾股定理', icon: Triangle, color: 'blue', description: '探索直角三角形的奥秘' },
    { id: 'real-numbers', name: '实数', icon: Divide, color: 'purple', description: '无理数与实数运算' },
    { id: 'coordinates', name: '位置与坐标', icon: BookOpen, color: 'green', description: '平面直角坐标系' },
    { id: 'function', name: '一次函数', icon: FunctionSquare, color: 'red', description: '函数图像与性质' },
    { id: 'equations', name: '二元一次方程组', icon: Brain, color: 'orange', description: '方程组的解法与应用' },
    { id: 'statistics', name: '数据的分析', icon: TrendingUp, color: 'pink', description: '平均数、中位数、众数' },
    { id: 'parallel', name: '平行线的证明', icon: MoveHorizontal, color: 'indigo', description: '几何证明与推理' },
  ];

  // 监听来自学习地图的导航事件
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('navigateToTab', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigateToTab', handleNavigate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <FunctionSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  广东省北师大版八年级数学（上）
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  图形化学习 · 可视化理解 · 系统梳理
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              北师大版上册
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 gap-1 h-auto p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger 
              value="map" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              学习地图
            </TabsTrigger>
            <TabsTrigger 
              value="triangle"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Triangle className="h-4 w-4 mr-2" />
              三角形
            </TabsTrigger>
            <TabsTrigger 
              value="congruent"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Scale className="h-4 w-4 mr-2" />
              全等三角形
            </TabsTrigger>
            <TabsTrigger 
              value="symmetry"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <MoveHorizontal className="h-4 w-4 mr-2" />
              轴对称
            </TabsTrigger>
            <TabsTrigger 
              value="function"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <FunctionSquare className="h-4 w-4 mr-2" />
              一次函数
            </TabsTrigger>
            <TabsTrigger 
              value="algebra"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Divide className="h-4 w-2 mr-2" />
              代数运算
            </TabsTrigger>
            <TabsTrigger 
              value="strategy"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              提分策略
            </TabsTrigger>
          </TabsList>

          {/* 学习地图 */}
          <TabsContent value="map" className="space-y-6">
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  学习路线图
                </CardTitle>
                <CardDescription>
                  广东省北师大版八年级数学上册核心知识体系
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <LearningMapCard 
                    title="第一章：勾股定理"
                    description="直角三角形三边关系、勾股定理的证明与应用"
                    color="blue"
                    icon={<Triangle className="h-8 w-8" />}
                    tabValue="pythagoras"
                  />
                  <LearningMapCard 
                    title="第二章：实数"
                    description="平方根、立方根、无理数、实数运算"
                    color="purple"
                    icon={<Divide className="h-8 w-8" />}
                    tabValue="real-numbers"
                  />
                  <LearningMapCard 
                    title="第三章：位置与坐标"
                    description="平面直角坐标系、点与坐标、距离公式"
                    color="green"
                    icon={<BookOpen className="h-8 w-8" />}
                    tabValue="coordinates"
                  />
                  <LearningMapCard 
                    title="第四章：一次函数"
                    description="函数概念、图像与性质、一次函数的应用"
                    color="red"
                    icon={<FunctionSquare className="h-8 w-8" />}
                    tabValue="function"
                  />
                  <LearningMapCard 
                    title="第五章：二元一次方程组"
                    description="代入消元法、加减消元法、方程组应用"
                    color="orange"
                    icon={<Brain className="h-8 w-8" />}
                    tabValue="equations"
                  />
                  <LearningMapCard 
                    title="第六章：数据的分析"
                    description="平均数、中位数、众数、数据的波动"
                    color="pink"
                    icon={<TrendingUp className="h-8 w-8" />}
                    tabValue="statistics"
                  />
                  <LearningMapCard 
                    title="第七章：平行线的证明"
                    description="平行线的判定与性质、几何证明方法"
                    color="indigo"
                    icon={<MoveHorizontal className="h-8 w-8" />}
                    tabValue="parallel"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 三角形 */}
          <TabsContent value="triangle">
            <TriangleChapter />
          </TabsContent>

          {/* 全等三角形 */}
          <TabsContent value="congruent">
            <CongruentChapter />
          </TabsContent>

          {/* 轴对称 */}
          <TabsContent value="symmetry">
            <SymmetryChapter />
          </TabsContent>

          {/* 一次函数 */}
          <TabsContent value="function">
            <FunctionChapter />
          </TabsContent>

          {/* 代数运算 */}
          <TabsContent value="algebra">
            <AlgebraChapter />
          </TabsContent>

          {/* 提分策略 */}
          <TabsContent value="strategy">
            <StrategyChapter />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function LearningMapCard({ 
  title, 
  description, 
  color, 
  icon,
  tabValue
}: { 
  title: string; 
  description: string; 
  color: string; 
  icon: React.ReactNode;
  tabValue: string;
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800 hover:shadow-blue-500/30',
    green: 'from-green-500 to-green-600 border-green-200 dark:border-green-800 hover:shadow-green-500/30',
    purple: 'from-purple-500 to-purple-600 border-purple-200 dark:border-purple-800 hover:shadow-purple-500/30',
    orange: 'from-orange-500 to-orange-600 border-orange-200 dark:border-orange-800 hover:shadow-orange-500/30',
    pink: 'from-pink-500 to-pink-600 border-pink-200 dark:border-pink-800 hover:shadow-pink-500/30',
    red: 'from-red-500 to-red-600 border-red-200 dark:border-red-800 hover:shadow-red-500/30',
  };

  return (
    <Card 
      className={`border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer ${colorClasses[color as keyof typeof colorClasses].split(' ')[2]} bg-white/90 dark:bg-gray-800/90 hover:${colorClasses[color as keyof typeof colorClasses].split(' ')[3]}`}
      onClick={() => {
        // 触发父组件的状态更新
        const event = new CustomEvent('navigateToTab', { detail: tabValue });
        window.dispatchEvent(event);
      }}
    >
      <CardHeader>
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center text-white mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}


