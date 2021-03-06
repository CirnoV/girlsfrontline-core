import { getEquipResource, getEquipStats } from './api/equip';
import { IEquip, IEquipStats, IPowerup } from './interface';

export default class Equip {
  public readonly id: number;
  public readonly codename: string;
  public readonly rank: number;
  public readonly category: string;
  public readonly type: string;
  public readonly company: string;
  public readonly exclusiveRate: number;
  public readonly maxLevel: number;
  public readonly buildTime: number;
  public readonly powerup: IPowerup;
  public readonly fitGuns: number[];
  public readonly name: string;
  public readonly introduction: string;

  private readonly _stats: IEquipStats;
  get stats():IEquipStats {
    return getEquipStats(this._stats, { level: this._level });
  }

  private _level:number;
  get level() {
    return this._level;
  }
  set level(level) {
    if (level < 0) {
      throw Error('`level` must be greater than -1');
    }
    if (level > this.maxLevel) {
      throw Error(`\`level\` must be less than ${this.maxLevel + 1}`);
    }
    this._level = level;
  }

  constructor(equipJson:IEquip) {
    const equipData = { ...equipJson };
    const { id, codename, rank, category, type, company,
      exclusiveRate, maxLevel, buildTime, stats, powerup, fitGuns } = equipData;
    this.id = id;
    this.codename = codename;
    this.rank = rank;
    this.category = category;
    this.type = type;
    this.company = company;
    this.exclusiveRate = exclusiveRate;
    this.buildTime = buildTime;
    this.powerup = powerup;
    this.fitGuns = fitGuns;
    this.maxLevel = maxLevel;
    this._level = maxLevel;
    this._stats = stats;
    this.name = getEquipResource(1, id);
    this.introduction = getEquipResource(3, id);
  }

  public toJSON():IEquip {
    return {
      id: this.id,
      codename: this.codename,
      rank: this.rank,
      category: this.category,
      type: this.type,
      company: this.company,
      exclusiveRate: this.exclusiveRate,
      buildTime: this.buildTime,
      powerup: this.powerup,
      fitGuns: this.fitGuns,
      maxLevel: this.maxLevel,
      stats: this._stats,
    };
  }
}
