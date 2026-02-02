'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Divide, Info, BookOpen } from 'lucide-react';

export function AlgebraChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 dark:border-orange-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Divide className="h-6 w-6 text-orange-600" />
            代数运算 - 计算之王
          </CardTitle>
          <CardDescription>
            整式乘法、因式分解、分式运算
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="formulas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger 
            value="formulas"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            乘法公式
          </TabsTrigger>
          <TabsTrigger 
            value="factorization"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            因式分解
          </TabsTrigger>
          <TabsTrigger 
            value="fraction"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            分式运算
          </TabsTrigger>
          <TabsTrigger 
            value="practice"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            计算练习
          </TabsTrigger>
        </TabsList>

        <TabsContent value="formulas">
          <MultiplicationFormulas />
        </TabsContent>

        <TabsContent value="factorization">
          <FactorizationMethods />
        </TabsContent>

        <TabsContent value="fraction">
          <FractionOperations />
        </TabsContent>

        <TabsContent value="practice">
          <CalculationPractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MultiplicationFormulas() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">乘法公式</CardTitle>
          <CardDescription>掌握公式的形式和应用</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
              <div className="font-medium text-blue-900 dark:text-blue-100">平方差公式</div>
              <div className="text-2xl font-mono font-bold text-center text-blue-600">
                (a + b)(a - b) = a² - b²
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                口诀："同号方减异号方"
              </div>
              <div className="text-xs text-gray-500">
                两项中，符号相同的平方减去符号不同的平方
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-2">
              <div className="font-medium text-green-900 dark:text-green-100">完全平方公式</div>
              <div className="text-2xl font-mono font-bold text-center text-green-600">
                (a ± b)² = a² ± 2ab + b²
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                口诀："首平方，尾平方，首尾两倍在中央"
              </div>
              <div className="text-xs text-gray-500">
                先平方，再平方，中间是首尾乘积的2倍
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-2">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">记忆方法</p>
              <p className="text-gray-600 dark:text-gray-400">
                将公式的左右两边反复互推，像背乘法口诀一样形成肌肉记忆。
                每天练习5道基础题，保持计算手感。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FactorizationMethods() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">因式分解方法</CardTitle>
          <CardDescription>整式乘法的逆运算</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-4">
            <div className="font-medium text-purple-900 dark:text-purple-100 mb-2">步骤口诀</div>
            <div className="text-2xl font-mono font-bold text-center text-purple-600">
              一提二套三十字四分组
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Badge className="bg-orange-500 mb-2">一提（公因式）</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                提取各项的公因式（字母、系数）
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Badge className="bg-blue-500 mb-2">二套（公式）</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                套用平方差或完全平方公式
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Badge className="bg-green-500 mb-2">三十字（相乘）</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                使用十字相乘法分解二次三项式
              </p>
            </div>

            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <Badge className="bg-pink-500 mb-2">四分组</Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                四项及以上进行分组分解
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="font-medium text-red-900 dark:text-red-100 mb-2">常见错误</div>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 分解不彻底（如：x⁴ - 1 = (x² + 1)(x² - 1)，还需继续分解）</li>
              <li>• 漏掉公因式（如：3x² - 6x = 3x(x - 2)）</li>
              <li>• 符号错误（注意负号的处理）</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FractionOperations() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">分式运算</CardTitle>
          <CardDescription>注意与分数的类比</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium mb-2">基本性质</div>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 分子、分母同时乘或除以同一个不为0的整式，分式值不变</li>
                <li>• 约分：分子分母同时除以公因式</li>
                <li>• 通分：化为同分母的分式</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium mb-2">运算顺序</div>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 乘法：分子乘分子，分母乘分母</li>
                <li>• 除法：乘以除式的倒数</li>
                <li>• 加减：先通分，再分子相加减</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
            <div className="font-medium text-red-900 dark:text-red-100 mb-2">
              ⚠️ 分式方程必检验
            </div>
            <div className="text-center text-xl font-mono font-bold text-red-600 mb-2">
              "分式方程解得欢，不忘回头验根关"
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              检验是否为增根，即是否使最简公分母为零
            </p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="font-medium mb-2">易错点</div>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 通分时，分母因式分解不彻底</li>
              <li>• 运算顺序不清晰（先乘除后加减）</li>
              <li>• 忘记验根</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CalculationPractice() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">计算练习建议</CardTitle>
          <CardDescription>保持计算手感，提高准确率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                每日练习计划
              </div>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 整式乘法：5-10 道（15分钟）</li>
                <li>• 因式分解：5-10 道（15分钟）</li>
                <li>• 分式运算：3-5 道（10分钟）</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium mb-2">练习要点</div>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 先保证准确，再提高速度</li>
                <li>• 记录错题，分析错误原因</li>
                <li>• 定期回顾，避免重复犯错</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-medium mb-2">计时训练</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                每周进行一次限时训练（30分钟完成20道计算题），模拟考试状态，
                提高计算速度和心理素质。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
