export default function RuleEngine() {
    this._ruleCache = [];
    this._result = "";
}

var strategies = {
    "平和体质": function(moduleList) {
        return this.moduleForEach(moduleList);
    },
    "测试体质": function(moduleList) {
        return this.moduleForEach(moduleList);
    },
    "所有轻度偏颇体质" : function(moduleList) {
        return this.moduleForEach(moduleList);
    },
    "所有中度偏颇体质": function(moduleList) {
        return this.moduleForEach(moduleList);
    },
    "所有重度偏颇体质": function(moduleList) {
        return this.moduleForEach(moduleList);
    },
    "偏颇体质":function(moduleList) {
        return this.moduleForEach(moduleList);
    },
    "平和体质2":function(moduleList) {
        return this.moduleForEach(moduleList);
    }
};
RuleEngine.prototype.init = function (ruleDefineSet) {
    var self = this;
    let parseIntervalData = function (intervalData) {
        let minEq = intervalData.charAt(0);
        let maxEq = intervalData.charAt(intervalData.length - 1);
        intervalData = intervalData.replace('[', '').replace(']', '');
        let min = intervalData.split(',')[0];
        let max = intervalData.split(',')[1];

        return {
            minEq: minEq,
            maxEq: maxEq,
            min: min,
            max: max
        }
    }
    let handleRule = function(rule, data) {
        if (rule["minEq"] == '[' && rule["maxEq"] == ']') {
            return module.moduleScore >= rule.min && module.moduleScore <= rule.max;
        } else if (rule["minEq"] == '[' && rule["maxEq"] == ')') {
            return module.moduleScore >= rule.min && module.moduleScore < rule.max;
        } else if (rule["minEq"] == '(' && rule["maxEq"] == ']') {
            return module.moduleScore > rule.min && module.moduleScore <= rule.max;
        } else if (rule["minEq"] == '(' && rule["maxEq"] == ')') {
            return module.moduleScore > rule.min && module.moduleScore < rule.max;
        } else {
            return false;
        }
    }
    let moduleForEach = function(moduleList) {
        let m1R = true;
        let m2R = false;
        for (var index in moduleList) {
            if (moduleList[index].moduleId == "1") {
                m1R = handleRule(this.m1, moduleList[index]);
            } else {
                if (this.m2.loginRel == '&&') {
                    m2R = handleRule(this.m2, moduleList[index]) && m2R;
                } else {
                    m2R = handleRule(this.m2, moduleList[index]) || m2R;
                }
            }
        }
        return (m1R && m2R) ? this.result : "";
    }

    ruleDefineSet.map(function (rule) {
        (function (rule) {
            let m1 = parseIntervalData(rule["m1Interval"]);
            let m2 = parseIntervalData(rule["m2Interval"]);
            m2["logicRule"] = rule["logicRule"];
            var result = rule["result"];
            let ruleObj = {
                m1: m1,
                m2: m2,
                result: result,
                moduleForEach: moduleForEach
            }
            self._ruleCache.push(function (moduleList) {
                return strategies[result].apply(ruleObj, moduleList);
            });
        })(rule)
    });
}

RuleEngine.prototype.start = function (moduleList) {
    for (var i = 0, ruleFunc; ruleFunc = this._ruleCache[i++];) {
        this._result = ruleFunc(moduleList)
        if (this._result != '') {
            return;
        }
    }
}

RuleEngine.prototype.getResult = function () {
    return this._result;
}





/// let ResultRuleDefine = [
    {
        m1Interval: '[21,25]',
        m2Interval: '[0,12]',
        logicRule: '&&',
        result: '平和体质'
    },
    {
        m1Interval: '[21,25]',
        m2Interval: '[13,17]',
        logicRule: '||',
        result: '所有轻度偏颇体质'
    },
    {
        m1Interval: '[0,20]',
        m2Interval: '[18,22]',
        logicRule: '||',
        result: '所有中度偏颇体质'
    },
    {
        m1Interval: '[0,20]',
        m2Interval: '[23,25]',
        logicRule: '||',
        result: '所有重度偏颇体质'
    },
    {
        m1Interval: '[0,20]',
        m2Interval: '[0,12]',
        logicRule: '&&',
        result: '平和体质2'
    },
    {
        m1Interval: '[21,25]',
        m2Interval: '[18,25]',
        logicRule: '||',
        result: '偏颇体质'
    }
]
