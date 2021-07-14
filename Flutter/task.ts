class User { };
class Group {
	constructor(...users: User[]) { }
};

class Task {
	accessGroup: Group;
	assignee: User;
	readonly createdAt: Date;
	updatedAt: Date;
	constructor(
		public readonly id: number,
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

	/** updates task's props except `id` and `createdAt`.
	 * @param task An Object only has Task's props to update. 
	 */
	update(props: Partial<Task>) {
		Object.entries(props).forEach(([k, v]) => {
			if (k === 'id' || k === 'createdAt') {
				// skip overwriting.
			} else if (k in this) {
				this[k] = v;
			}
		});
		return this;
	}
}

