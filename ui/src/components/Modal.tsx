import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "../components/ui/dialog"
const Modal = ({id='close-dialog', children, content, title }: {id:string, children: any, content: any, title: string }) => {
    return (
        <Dialog >
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="modals">
                <DialogHeader>
                    <DialogTitle >{title}</DialogTitle>
                    <DialogClose className="modal" id={id}/>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default Modal
