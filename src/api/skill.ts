import { ISkill, ISkillJson } from '../interface';

export enum SkillType {
  battle,
  mission,
}

export function getSkill(skill:ISkillJson, { level = 10 } = {}):ISkill {
  const { id, codename, cooldownType, initialCooldown, dataPool, consumption } = skill;
  const name:string = getSkillResource(1, id, level);
  const description:string = getSkillResource(2, id, level);
  const detail = getSkillResource(3, id, level);
  const { cooldown } = dataPool.find(({ level: poolLevel }) => poolLevel === level) || { cooldown: 0 };

  return {
    id,
    codename,
    name,
    description,
    cooldownType,
    initialCooldown,
    cooldown,
    detail,
    consumption,
  };
}

export function getSkillResource(resourceId:number|string, skillId:string, level:number|string):string {
  const padLevel = String(level).padStart(2, '0');
  const key:string = skillId.startsWith('*')
    ? `mission_skill_config-${resourceId}${skillId.substr(1).padStart(5, '0')}${padLevel}`
    : `battle_skill_config-${resourceId}${skillId.padStart(6, '0')}${padLevel}`;

  return key;
}
