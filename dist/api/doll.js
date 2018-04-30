'use strict';var _sign=require('babel-runtime/core-js/math/sign'),_sign2=_interopRequireDefault(_sign),_keys=require('babel-runtime/core-js/object/keys'),_keys2=_interopRequireDefault(_keys),_extends2=require('babel-runtime/helpers/extends'),_extends3=_interopRequireDefault(_extends2);Object.defineProperty(exports,'__esModule',{value:!0});exports.default=getDoll;var _dollGrow=require('../../data/dollGrow.json'),_dollGrow2=_interopRequireDefault(_dollGrow),_dollAttribute=require('../../data/dollAttribute.json'),_dollAttribute2=_interopRequireDefault(_dollAttribute),_skill=require('./base/skill');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function getDoll(doll){var skillData=doll.skill,skill2Data=doll.skill2,skill=(0,_skill.getSkillData)(skillData),skill2=(0,_skill.getSkillData)(skill2Data);return(0,_extends3.default)({},doll,{skill:skill,skill2:skill2,getStats:function getStats(){var options=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},_options$level=options.level,level=void 0===_options$level?100:_options$level,_options$favor=options.favor,favor=void 0===_options$favor?50:_options$favor,type=doll.type,baseStats=doll.stats,grow=doll.grow,attribute=_dollAttribute2.default[type],normal=_dollGrow2.default.normal,after100=_dollGrow2.default.after100,basicStats=100<level?(0,_extends3.default)({},normal.basic,after100.basic):normal.basic,growStats=100<level?(0,_extends3.default)({},normal.grow,after100.grow):normal.grow,stats=(0,_extends3.default)({},baseStats);return(0,_keys2.default)(attribute).forEach(function(key){var _Mathceil=Math.ceil,basicData=basicStats[key],growData=growStats[key],stat=1<basicData.length?_Mathceil((basicData[0]+(level-1)*basicData[1])*attribute[key]*baseStats[key]/100):_Mathceil(basicData[0]*attribute[key]*baseStats[key]/100);stat+=growData?_Mathceil((growData[1]+(level-1)*growData[0])*attribute[key]*baseStats[key]*grow/100/100):0,stat+='pow'===key||'hit'===key||'dodge'===key?(0,_sign2.default)(getFavorRatio(favor))*_Mathceil(Math.abs(stat*getFavorRatio(favor))):0,stats[key]=stat}),stats},getSkill:function getSkill(options){return(0,_skill.getSkill)(skill,options)},getSkill2:skill2?function(options){return(0,_skill.getSkill)(skill2,options)}:function(){}})}function getFavorRatio(favor){if(10>favor)return-.05;return 90>favor?0:140>favor?.05:190>favor?.1:.15}