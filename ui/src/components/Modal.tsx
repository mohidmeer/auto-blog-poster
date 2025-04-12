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
        <Dialog>
            
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogClose id={id}/>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default Modal
