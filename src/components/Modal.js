import Movie from './Movie'
export default function Modal(props){
    const film=props.dataModal
    function closeModal(){
      props.setToggleModal(false)
    }

    return (
      <div>
{/* //         <div className="modal-backdrop">
//             <div className="modal">
// <header className="modal-header"></header>
//             </div>
// its modal
//         </div> */}
  <div className="modal-backdrop" onClick={closeModal}>

    <div className="modal" onClick={e=>e.stopPropagation()}>
      {/* <header className="modal-header">
        {film.rating.kp}
          <button
            type="button"
            className="btn-close"
            onClick={closeModal}
          >
            x
          </button>
      </header> */}
      <div className="modal-body">
<Movie film={props.dataModal}/>
{/* <div>{film.description}</div> */}
        </div>
      </div>
      {/* <footer className="modal-footer">
        <slot name="footer">

          <button
            type="button"
            className="btn-green btn"
          >
            Закрыть
          </button>
        </slot>
      </footer> */}
    </div>
  </div>
    )
} 

{/* <template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          {{
            this.mode == "add"
              ? "Добавление задания!"
              : "Редактирование задания!"
          }}
          <button
            type="button"
            class="btn-close"
            :isModalOpen="isModalOpen"
            @click="confirmClose()"
          >
            x
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <div class="body-exercise">
          <div class="body-header">Задание:</div>
          <textarea
            name=""
            cols="40"
            rows="3"
            v-model="this.exercise"
            class="body-textarea"
            @input="updateHistory"
          >
          </textarea>
        </div>
        <div class="body-list">
          <div>Список задач:</div>
          <div>
            <button class="btn btn-first" @click="addTask()">Добавить</button>
            <button class="btn" @click="deleteTask()">Удалить</button>
          </div>
        </div>
        <div class="body-table">
          <table v-show="tasks.length != 0">
            <tr>
              <th>Статус</th>
              <th>Название</th>
            </tr>

            <tr
              v-for="(task, index) in tasks"
              :key="'task' + index"
              @click="chooseElem(index)"
            >
              <td>
                <input
                  type="checkbox"
                  @change="changeCheckbox(index), updateHistory()"
                  :checked="checked[index]"
                />
              </td>
              <td>
                <input
                  type="text"
                  @input="changeInput($event, index)"
                  :value="task"
                />
              </td>
            </tr>
          </table>
        </div>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button
            class="btn"
            :class="{ 'btn-disabled': redoDisabled }"
            :disabled="redoDisabled"
            @click="redo"
          >
            Вперед
          </button>
          <button
            class="btn"
            :class="{ 'btn-disabled': undoDisabled }"
            @click="undo"
            :disabled="undoDisabled"
          >
            Назад
          </button>
          <button class="btn" @click="changeSave()">Сохранить</button>

          <button
            type="button"
            class="btn-green btn"
            :modal="isModalOpen"
            @click="confirmClose()"
          >
            Закрыть
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import store from "@/store";

export default {
  name: "AppModal",
  data() {
    return {
      exercise: "",
      tasks: [],
      checked: [],
      chosenIndex: "",
      history: [
        {
          exercise: "",
          tasks: [],
          checked: [],
        },
      ],
      historyIndex: 0,
    };
  },
  methods: {
    ...mapActions({
      saveChange: "saveChange",
      toggleModal: "toggleModal",
    }),
    addTask() {
      this.tasks.push("");
      this.updateHistory();
    },
    changeTask(e, index) {
      this.tasks[index] = e.target.value;
    },
    changeCheckbox(index) {
      this.checked[index] = !this.checked[index];
    },
    chooseElem(index) {
      this.chosenIndex = index;
    },
    deleteTask() {
      this.checked.splice(this.chosenIndex, 1);
      this.tasks.splice(this.chosenIndex, 1);
    },
    changeSave() {
      if (this.exercise != "") {
        let new_items = {
          exercise: this.exercise,
          tasks: this.tasks,
          checked: this.checked,
        };

        store.dispatch("saveChange", [new_items, this.chosenElem]);
        this.close();
      } else {
        alert("Пожалуйста, введите название задания!");
      }
    },
    changeInput($event, index) {
      this.changeTask($event, index),
        this.updateHistory(),
        (this.task = $event.target.value);
    },
    confirmClose() {
      if (this.mode == "edit") {
        if (confirm("Вы точно хотите отменить редактирование?")) {
          this.close();
        }
      } else if (this.mode == "add") {
        if (confirm("Вы точно хотите отменить добавление?")) {
          this.close();
        }
      }
    },
    close() {
      this.toggleModal();
      this.clearFields();
      this.history = [
        {
          exercise: "",
          tasks: [],
          checked: [],
        },
      ];
      this.historyIndex = 0;
    },
    clearFields() {
      this.exercise = "";
      this.tasks = [];
      this.checked = [];
      this.chosenIndex = "";
    },
    updateHistory() {
      if (this.historyIndex == 0) {
        this.history.push({
          exercise: this.exercise,
          tasks: this.tasks,
          checked: this.checked,
        });

        this.historyIndex++;
      }
      this.history = JSON.parse(
        JSON.stringify(this.history.slice(0, this.historyIndex))
      );
      this.history.push({
        exercise: this.exercise,
        tasks: this.tasks,
        checked: this.checked,
      });
      this.historyIndex++;
    },
    undo() {
      if (this.historyIndex == this.history.length) {
        this.historyIndex--;
      }
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.exercise = this.history[this.historyIndex].exercise;
        for (let i = 0; i < this.history[this.historyIndex].tasks.length; i++) {
          this.tasks[i] = this.history[this.historyIndex].tasks[i];
          this.checked[i] = this.history[this.historyIndex].checked[i];
        }
        this.checked = this.history[this.historyIndex].checked;
      }
    },
    redo() {
      if (this.historyIndex < this.history.length) {
        this.exercise = this.history[this.historyIndex].exercise;
        this.tasks = this.history[this.historyIndex].tasks;
        this.checked = this.history[this.historyIndex].checked;
        this.historyIndex++;
      }
    },
  },

  computed: {
    ...mapState({
      items: "items",
      isModalOpen: "isModalOpen",
      mode: "mode",
      chosenElem: "chosenElem",
    }),
    undoDisabled() {
      return this.historyIndex === 0;
    },
    redoDisabled() {
      return this.historyIndex === this.history.length;
    },
  },
  watch: {
    isModalOpen: function () {
      if (
        this.chosenElem != -1 &&
        this.mode == "edit" &&
        this.isModalOpen == true
      ) {
        let ex = JSON.parse(JSON.stringify(this.items[this.chosenElem]));
        this.exercise = ex.exercise;
        this.tasks = ex.tasks;
        this.checked = ex.checked;
        this.history = [
          {
            exercise: ex.exercise,
            tasks: ex.tasks,
            checked: ex.checked,
          },
        ];
      } else {
        this.clearFields();
      }
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fef8ff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 700px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: var(--modal-bg-color);
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 0px;
  cursor: pointer;
  font-weight: bold;
  color: var(--modal-bg-color);
  background: transparent;
}

.btn {
  color: var(--modal-text-color);
  background-color: var(--modal-bg-color);
  height: 30px;
  width: 100px;
  border-radius: 4px;
  margin-left: 10px;
  font-size: 15px;
  border: 1px solid var(--modal-bg-color);
}
.btn-disabled {
  background-color: var(--modal-bg-color);
  opacity: 0.5;
}
.btn-first {
  margin-left: 40px;
}
.body-exercise {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
.body-header {
  padding: 20px;
}
.body-textarea {
  font-size: 20px;
  resize: none;
}

.body-list {
  display: flex;
  padding: 20px;
}
.body-table {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style> */}