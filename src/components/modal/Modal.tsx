
interface ModalProps {
   type: "victory" | "loss";
}

export const Modal: React.FC<ModalProps> = ({type}) => {

    return (
        <>
        {type === "victory" ? (<div className="modal">
            <h3>Победа!</h3>
            <p>Ваше время  минут секунд</p>
            <button type="button">Играть снова</button>
            <button type="button">Смотреть результаты</button>
        </div>) : (<div className="modal">
            <h3>Вы проиграли!</h3>
            <p>Попробуйте снова!</p>
            <button type="button">Играть снова</button>
        </div>)}
        </>
    )
}