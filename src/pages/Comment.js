import React, {useState, useEffect, useRef} from 'react'

function Comment() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [comItemList, setComItemList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const max_name_length = 10;
    const max_password_length = 10;
    const max_text_length = 300;
    
    // 모달 및 삭제를 위한 상태 관리
    const [showModal, setShowModal] = useState(null);
    const [deletePassword, setDeletePassword] = useState('');
    const [commentToDelete, setCommentToDelete] = useState(null);

    const [visibleComments, setVisibleComments] = useState(5);
    const [isExpanded, setIsExpanded] = useState(false);

    // 말풍선 애니메이션을 위한 상태
    const [animatedComments, setAnimatedComments] = useState(new Set());

    // 공유 관련 상태 (현재 사용하지 않음)
    // const [showShareModal, setShowShareModal] = useState(false);
    // const [copySuccess, setCopySuccess] = useState(false);

    // API 기본 URL
    const API_BASE_URL = 'http://121.141.69.93:5005/api';

    // IntersectionObserver 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { 
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentContainer = containerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }

        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, []);

    // 댓글 "더보기" 또는 "닫기" 버튼 클릭 처리
    const toggleCommentsVisibility = () => {
        if (isExpanded) {
            setVisibleComments(5);
            setIsExpanded(false);
        } else {
            setVisibleComments(comItemList.length);
            setIsExpanded(true);
        }
    };

    // 방명록 데이터 가져오기
    useEffect(() => {
        fetchComments();
    }, []);

    // 말풍선 순차 애니메이션 처리
    useEffect(() => {
        if (comItemList.length > 0 && isVisible) {
            const animateComments = () => {
                const visibleItems = comItemList.slice(0, visibleComments);
                visibleItems.forEach((comment, index) => {
                    setTimeout(() => {
                        setAnimatedComments(prev => new Set([...prev, comment.id]));
                    }, index * 200); // 200ms 간격으로 순차 애니메이션
                });
            };

            // 기존 애니메이션 초기화
            setAnimatedComments(new Set());
            
            // 새로운 애니메이션 시작
            setTimeout(animateComments, 500); // 전체 섹션이 나타난 후 시작
        }
    }, [comItemList, isVisible, visibleComments]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/guestbook`);
            if (response.ok) {
                const comments = await response.json();
                setComItemList(comments);
            } else {
                console.error('방명록 조회 실패');
            }
        } catch (error) {
            console.error('방명록 조회 오류:', error);
        }
    };

    // 방명록 등록
    const onCommentSubmit = async () => {
        if (name === '' || password === '' || message === '') {
            alert("모든 항목을 입력해주세요.");
            return; 
        }

        try {
            const response = await fetch(`${API_BASE_URL}/guestbook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    message: message,
                }),
            });

            if (response.ok) {
                const newComment = await response.json();
                
                // 폼 초기화
                setName('');
                setPassword('');
                setMessage('');

                // 로컬 상태 업데이트
                setComItemList([newComment, ...comItemList]);
                
                // 새 댓글 애니메이션 추가
                setTimeout(() => {
                    setAnimatedComments(prev => new Set([...prev, newComment.id]));
                }, 100);
                
                alert('방명록이 등록되었습니다.');
            } else {
                const errorData = await response.json();
                alert(errorData.error || '방명록 등록이 실패했습니다.');
            }
        } catch (error) {
            console.error("Error adding comment: ", error);
            alert('방명록 등록이 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 방명록 삭제
    const deleteComment = async (id, storedPassword) => {
        try {
            const response = await fetch(`${API_BASE_URL}/guestbook/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: deletePassword,
                }),
            });

            if (response.ok) {
                // 삭제 성공 시 로컬 상태에서 제거
                setComItemList(comItemList.filter(comment => comment.id !== id));
                setShowModal(null);
                setDeletePassword('');
                setCommentToDelete(null);
                alert('방명록이 삭제되었습니다.');
            } else {
                const errorData = await response.json();
                alert(errorData.error || '방명록 삭제가 실패했습니다.');
            }
        } catch (error) {
            console.error("Error deleting comment: ", error);
            alert('방명록 삭제가 실패했습니다.');
        }
    };

    // URL 복사 함수 (현재 사용하지 않음)
    /*
    const copyToClipboard = async () => {
        try {
            // 청첩장 메인 페이지 URL로 변경
            const weddingUrl = window.location.origin;
            await navigator.clipboard.writeText(weddingUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('URL 복사 실패:', err);
            alert('URL 복사에 실패했습니다.');
        }
    };

    // 카카오톡 공유 함수 (현재 사용하지 않음)
    const shareToKakao = () => {
        // 청첩장 메인 페이지 URL로 변경
        const weddingUrl = window.location.origin;
        const shareText = '우리 결혼식에 초대합니다! 💕 청첩장을 확인해주세요.';
        
        // 카카오톡 앱으로 메시지 전송 (수신자 선택 화면으로 이동)
        const kakaoShareUrl = `kakaotalk://send?text=${encodeURIComponent(shareText + '\n\n' + weddingUrl)}`;
        
        // 앱 실행 시도
        window.location.href = kakaoShareUrl;
        
        // 2초 후 앱이 실행되지 않았으면 웹 공유로 폴백
        setTimeout(() => {
            const webShareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(weddingUrl)}&text=${encodeURIComponent(shareText)}`;
            window.open(webShareUrl, '_blank');
        }, 2000);
    };
    */

    return (
        <div className='bc-pink container' ref={containerRef}>
            <div className={`title fade-in ${isVisible ? 'visible' : ''}`}>방명록</div>
            <div className={`commment_content fade-in ${isVisible ? 'visible' : ''}`}>
                <div>
                    <input 
                        type="text" 
                        value={name} 
                        placeholder='이름' 
                        onChange={(e) => setName(e.target.value)} 
                        maxLength={max_name_length}
                    />
                    <input 
                        type="password" 
                        value={password} 
                        placeholder='비밀번호'
                        onChange={(e) => setPassword(e.target.value)} 
                        maxLength={max_password_length}
                    />
                </div>
                <textarea 
                    className='comment__message'
                    value={message} 
                    placeholder='축하메시지'
                    onChange={(e) => setMessage(e.target.value)} 
                    maxLength={max_text_length}
                />
                <button className='comment__btn' onClick={onCommentSubmit}>메시지 작성하기</button>
            </div>
            <div className={`kakao-chat-bg fade-in ${isVisible ? 'visible' : ''}`}>
                <div className='kakao-chat-list'>
                {comItemList.slice(0, visibleComments).map((commentItem, index) => (
                    <div 
                        className={`kakao-chat-item ${index % 2 === 0 ? 'me' : 'other'} chat-bubble-animation ${animatedComments.has(commentItem.id) ? 'animated' : ''}`} 
                        key={commentItem.id}
                        style={{
                            animationDelay: `${index * 0.2}s`
                        }}
                    >
                        <div className='kakao-bubble-group'>
                            <div className='kakao-name'>{commentItem.name}</div>
                            <div className={`kakao-bubble ${index % 2 === 0 ? 'me' : 'other'}`}>{commentItem.message}</div>
                            <div className='kakao-time'>{commentItem.date}</div>
                        </div>
                        <button 
                            className="comment__btn-close"
                            onClick={() => {
                                setShowModal(showModal === commentItem.id ? null : commentItem.id);
                                setCommentToDelete({id: commentItem.id, password: commentItem.password});
                            }}
                        >
                            &times;
                        </button>
                        {showModal === commentItem.id && (
                            <div className='comment__password'>
                                <input 
                                    type="password" 
                                    placeholder='비밀번호 입력'
                                    value={deletePassword} 
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                />
                                <button 
                                    onClick={() => deleteComment(commentToDelete.id, commentToDelete.password)}
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div> 
                ))}
                {comItemList.length > 5 && (
                    <button onClick={toggleCommentsVisibility} className='comment__btn-more'>
                        {isExpanded ? '닫기' : '더보기'}
                    </button>
                )}
                </div>
            </div>
            
            {/* 공유하기 섹션 */}
            {<div className={`share-section fade-in ${isVisible ? 'visible' : ''}`}>
                <div className="share-buttons">
                    <button 
                        className={`share-btn url-copy`} 
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.origin);
                            alert("주소가 복사되었습니다!");
                        }}
                    >
                        <span className="copy-icon">📋</span>
                        청첩장 링크 복사
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default Comment
