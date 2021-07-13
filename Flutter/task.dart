class User {};
class Group{
	Group.one(Use user);
};

class Task{
  int id;
  String title;
  User creator;
  late User assignee;
  late Group accessGroup;
  String? description;
  String? type;
  String? importance;
  String? placement;
  double? estimatedHour;
  DateTime? startAt;
  DateTime? finishAt;
  DateTime? due;
  DateTime? startedAt;
  DateTime? finishedAt;
  late DateTime createdAt;
  late DateTime updatedAt;
  Task(
    this.creator,
    this.id,
    this.title, {
    this.description,
    User? assignee,
    Group? accessGroup,
    this.placement,
    this.estimatedHour,
    this.type,
    this.due,
    this.startAt,
    this.finishAt,
    this.startedAt,
    this.finishedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    this.accessGroup = accessGroup ?? Group.one(creator);
    this.assignee = assignee ?? creator;
    this.createdAt = createdAt ?? DateTime.now();
    this.updatedAt = updatedAt ?? this.createdAt;
  }
  Task update(TaskField props) { // NOTE I hate this.
    title = props.title ?? title;
    creator = props.creator ?? creator;
    assignee = props.assignee ?? assignee;
    accessGroup = props.accessGroup ?? accessGroup;
    description = props.description ?? description;
    type = props.type ?? type;
    importance = props.importance ?? importance;
    placement = props.placement ?? placement;
    estimatedHour = props.estimatedHour ?? estimatedHour;
    startAt = props.startAt ?? startAt;
    finishAt = props.finishAt ?? finishAt;
    due = props.due ?? due;
    startedAt = props.startedAt ?? startedAt;
    finishedAt = props.finishedAt ?? finishedAt;
    createdAt = props.createdAt ?? createdAt;
    updatedAt = props.updatedAt ?? updatedAt;
    return this;
  }
}
class TaskField{
  String? title;
  User? creator;
  User? assignee;
  Group? accessGroup;
  String? description;
  String? type;
  String? importance;
  String? placement;
  double? estimatedHour;
  DateTime? startAt;
  DateTime? finishAt;
  DateTime? due;
  DateTime? startedAt;
  DateTime? finishedAt;
  DateTime? createdAt;
  DateTime? updatedAt;
}
