export default abstract class TableManager {
    abstract add(): void;

    abstract deleteById(id: number): void;

    abstract editById(id: number): void;

    abstract saveEditing(): void;
}