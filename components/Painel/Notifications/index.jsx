import Image from 'next/image'
import React from 'react'

const Notifications = ({active}) => {
    return (
        <div className={active ? 'notifications active' : 'notifications'}>
            <ul>
                <a href='#' className="allNotifications">
                    Ler todas as 123 notificações
                </a>
                <li className='not_read'>
                    <a href="#">
                        <Image width={36} alt="Notificação" title="Notificação" height={36} src='https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Fbanco_do_brasil.png?alt=media&token=c29ad5aa-4153-437a-b4ae-f7f24dc93319'/>
                        <div className="notificationText">
                            <span title='O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver'>
                                O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver
                            </span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image width={36} alt="Notificação" title="Notificação" height={36} src='https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Fbanco_do_brasil.png?alt=media&token=c29ad5aa-4153-437a-b4ae-f7f24dc93319'/>
                        <div className="notificationText">
                            <span title='O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver'>
                                O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver
                            </span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image width={36} alt="Notificação" title="Notificação" height={36} src='https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Fbanco_do_brasil.png?alt=media&token=c29ad5aa-4153-437a-b4ae-f7f24dc93319'/>
                        <div className="notificationText">
                            <span title='O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver'>
                                O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver
                            </span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image width={36} alt="Notificação" title="Notificação" height={36} src='https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Fbanco_do_brasil.png?alt=media&token=c29ad5aa-4153-437a-b4ae-f7f24dc93319'/>
                        <div className="notificationText">
                            <span title='O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver'>
                                O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver
                            </span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image width={36} alt="Notificação" title="Notificação" height={36} src='https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Fbanco_do_brasil.png?alt=media&token=c29ad5aa-4153-437a-b4ae-f7f24dc93319'/>
                        <div className="notificationText">
                            <span title='O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver'>
                                O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver
                            </span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image width={36} alt="Notificação" title="Notificação" height={36} src='https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Fbanco_do_brasil.png?alt=media&token=c29ad5aa-4153-437a-b4ae-f7f24dc93319'/>
                        <div className="notificationText">
                            <span title='O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver'>
                                O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver
                            </span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image width={36} alt="Notificação" title="Notificação" height={36} src='https://firebasestorage.googleapis.com/v0/b/interjud-6e608.appspot.com/o/creditos%2Fbanco_do_brasil.png?alt=media&token=c29ad5aa-4153-437a-b4ae-f7f24dc93319'/>
                        <div className="notificationText">
                            <span title='O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver'>
                                O seu crédito "BANCO DO BRASIL" recebeu uma proposta. Clique para ver
                            </span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Notifications