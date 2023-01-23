import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
//import {updateItem} from '../utils/common.js';
import { sortPointDownPrice, sortPointDownTime, sortPointUp} from '../utils/point.js';
import {SortType} from '../const.js';

//const LIMIT_POINTS = 5;

export default class TripEventsPresenter {
  #eventsListComponent = new EventsListView();
  #tripEventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #offers = null;
  #destinations = null;
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = null;

  //#points = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  //#sourcedPoints = [];


  constructor(tripEventsElement, pointsModel, offersModel, destinationsModel) {
    this.#tripEventsContainer = tripEventsElement;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const pointsWithDestinations = [...this.#pointsModel.getPointsWithDestinations(this.#destinations, this.#offers)];
    switch (this.#currentSortType) {
      case SortType.DAY:
        return pointsWithDestinations.sort(sortPointUp);
      case SortType.TIME:
        return pointsWithDestinations.sort(sortPointDownTime);
      case SortType.PRICE:
        return pointsWithDestinations.sort(sortPointDownPrice);
    }
    return pointsWithDestinations;
  }

  init() {
    // this.#offers = this.#offersModel.getOffers();
    // this.#destinations = this.#destinationsModel.getDestinations();
    // this.#points = [...this.#pointsModel.getPointsWithDestinations(this.#destinations, this.#offers)];
    // this.#sourcedPoints = [...this.#points];
    // this.#points.sort(sortPointUp);
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  //#handlePointChange = (updatedPoint) => {
    // this.#points = updateItem(this.#points, updatedPoint);
    // this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
  //  this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  //};

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsListComponent.element,
      //onDataChange: this.#handlePointChange,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      offers: this.#offers,
      destinations: this.#destinations,
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  // #sortPoints(sortType) {
  //   switch (sortType) {
  //     case SortType.DAY:
  //       this.#points.sort(sortPointUp);
  //       break;
  //     case SortType.PRICE:
  //       this.#points.sort(sortPointDownPrice);
  //       break;
  //     case SortType.TIME:
  //       this.#points.sort(sortPointDownTime);
  //       break;
  //     default:
  //       this.#points = [...this.#sourcedPoints];
  //   }

  //   this.#currentSortType = sortType;
  // }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    //this.#sortPoints(sortType);
    this.#clearTaskList();
    this.#renderEventsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #clearTaskList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderEventsList() {
    const points = this.points;
    render(this.#eventsListComponent, this.#tripEventsContainer);
    //for (let i = 0; i < LIMIT_POINTS; i++) {
    //  this.#renderPoint(this.#points[i]);
    //}
    this.#renderPoints(points);
  }

  #renderNoPoints() {
    render( this.#listEmptyComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTrip() {
    const taskCount = this.tasks.length;
    if( taskCount === 0 ){
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderEventsList();
  }
}
