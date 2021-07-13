class User { };
class Group { 
	constructor(...users:User[]){}
};

class Task {
	accessGroup: Group;
	assignee: User;
	createdAt: Date;
	updatedAt: Date;
	constructor(
		readonly id: number,
		public title: string,
		public creator: User,
		assignee?: User,
		accessGroup?: Group,
		public description?: string,
		public type?: string,
		public importance?: string,
		public placement?: string,
		public estimatedHour?: number,
		public startAt?: Date,
		public finishAt?: Date,
		public due?: Date,
		public startedAt?: Date,
		public finishedAt?: Date,
		createdAt?: Date,
		updatedAt?: Date
	) {
		this.accessGroup = accessGroup ?? new Group(creator);
		this.assignee = assignee ?? creator;
		this.createdAt = createdAt ?? new Date();
		this.updatedAt = updatedAt ?? this.createdAt;
	}

	update(props: Partial<Task>) { // NOTE I hate this.
		Object.entries(props).forEach(([k, v]) => {
			if (k === 'id') { throw new Error("you can't update id."); }
			this[k] = v;
		});
		return this;
	}
}
