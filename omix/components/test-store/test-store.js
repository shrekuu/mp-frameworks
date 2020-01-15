import create from '../../utils/create'


create.Component({
  use: ['logs'],
  computed: {
    logsLength() {
      return this.logs.length
    }
  }
})
