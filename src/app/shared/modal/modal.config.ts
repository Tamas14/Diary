import {TemplateRef} from "@angular/core";
import {ModalComponent} from "./modal.component";
import {Store} from "@ngrx/store";
import {State} from "../../diary/store/story.reducer";

export interface ModalConfig {
  modalTitle: string
}
