import {remove, render, RenderPosition} from '../framework/render.js';
import EditPoint from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';
import { TYPE } from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offers = null;
  #destinations = null;

  #pointEditComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({offers, destinations}) {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointEditComponent = new EditPoint({
      listOffers: this.#offers,
      listDestinations: this.#destinations,
      listType: TYPE,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onEditClick: this.#handleEditPointClick,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleEditPointClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

}
