var ActionDefine = /** @class */ (function () {
    function ActionDefine() {
    }
    ActionDefine.Stand = "stand";
    ActionDefine.Move = "move";
    ActionDefine.Fly = "fly";
    ActionDefine.Jump = "jump";
    ActionDefine.Skill = "skill";
    ActionDefine.Dead = "dead";
    ActionDefine.Hit = "hit";
    ActionDefine.Shose = "shose";
    ActionDefine.Chong = "chong";
    ActionDefine.Shan = "shan";
    ActionDefine.Collect = "collect";
    ActionDefine.DaZuo = "dazuo";
    ActionDefine.Ride = "ride";
    ActionDefine.QieXian = "qiexian";
    ActionDefine.Teleport = "teleport";
    ActionDefine.Drop = "drop";
    ActionDefine.Pick = "pick";
    ActionDefine.ShiFa = "shifa";
    ActionDefine.TiaoYue = "feixing";
    ActionDefine.ChuChang = "chuchang";
    ActionDefine.ZaSkill = "skill_za";
    ActionDefine.Show = "show";
    ActionDefine.JuGong = "jiehun_jugong";
    ActionDefine.en_Dead = [ActionDefine.Move, ActionDefine.Skill, ActionDefine.Fly, ActionDefine.Shose, ActionDefine.Teleport, ActionDefine.Chong, ActionDefine.Shan, ActionDefine.Jump];
    ActionDefine.en_Fly = [ActionDefine.Stand, ActionDefine.Move, ActionDefine.Dead, ActionDefine.Skill, ActionDefine.Teleport, ActionDefine.Chong, ActionDefine.Shan, ActionDefine.Jump];
    ActionDefine.en_Shose = [ActionDefine.Stand, ActionDefine.Move, ActionDefine.Dead, ActionDefine.Skill, ActionDefine.Fly, ActionDefine.Teleport, ActionDefine.Chong, ActionDefine.Shan, ActionDefine.Jump, ActionDefine.Shose];
    ActionDefine.en_Teleport = [ActionDefine.Move, ActionDefine.Dead, ActionDefine.Skill, ActionDefine.Fly, ActionDefine.Chong, ActionDefine.Shan, ActionDefine.Jump, ActionDefine.Shose];
    ActionDefine.en_Chong = [ActionDefine.Stand, ActionDefine.Move, ActionDefine.Dead, ActionDefine.Skill, ActionDefine.Teleport, ActionDefine.Fly, ActionDefine.Shan, ActionDefine.Jump, ActionDefine.Chong];
    ActionDefine.en_Shan = [ActionDefine.Stand, ActionDefine.Move, ActionDefine.Dead, ActionDefine.Skill, ActionDefine.Teleport, ActionDefine.Fly, ActionDefine.Chong, ActionDefine.Shan, ActionDefine.Jump];
    ActionDefine.en_Jump = [ActionDefine.Stand, ActionDefine.Move, ActionDefine.Dead, ActionDefine.Skill, ActionDefine.Teleport, ActionDefine.Fly, ActionDefine.Chong, ActionDefine.Shan, ActionDefine.Jump];
    ActionDefine.en_Move = [ActionDefine.Dead, ActionDefine.Teleport, ActionDefine.Fly, ActionDefine.Chong, ActionDefine.Shan, ActionDefine.Jump];
    return ActionDefine;
}());
//# sourceMappingURL=ActionDefine.js.map